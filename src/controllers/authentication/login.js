import { ValidationError } from "yup";

import client from "../../configs/redis.config.js";
import * as helpers from "../../helpers/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import * as validation from "./validationSchemata/index.js";

/*----------------------------------------------------*/
// LOGIN
/*----------------------------------------------------*/
export const login = async (req, res, next) => {
  try {
    // USER CAN LOGIN USING THEIR EMAIL, PHONE NUMBER, OR USERNAME
    const { data, password } = req.body;
    await validation.loginValidationSchema.validate(req.body);

    // CHECK IF DATA IS USER'S EMAIL
    const isEmail = await validation.isEmail(data);
    const isPhoneNumber = await validation.isPhoneNumber(data);
    const isUsername = await validation.isUsername(data);

    // BUILD A QUERY BASED ON DATA'S CONTENT
    const whereQuery = isEmail
      ? { email: data }
      : isPhoneNumber
      ? { phone_number: data }
      : { username: data };

    // CHECK IF USER EXIST
    const userExists = await User?.findOne({
      where: whereQuery,
    });

    if (!userExists)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // CHECK USER'S STATUS (1: not verified, 2: verified, 3: deactivated)
    if (userExists?.dataValues?.status === 3) {
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };
    }

    // CHECK IF PASSWORD CORRECT
    const isPasswordCorrect = helpers.compare(
      password,
      userExists?.dataValues?.password
    );

    if (!isPasswordCorrect) {
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.INVALID_CREDENTIALS + `: wrong password`,
      };
    }

    // CHECK TOKEN IN REDIS
    const cachedToken = await client.get(userExists?.dataValues?.uuid);
    const tokenIsValid = cachedToken && helpers.verifyToken(cachedToken);

    let accessToken = null;

    if (tokenIsValid) {
      accessToken = cachedToken;
    } else {
      // GENERATE NEW ACCESS TOKEN
      accessToken = helpers.createToken({
        uuid: userExists?.dataValues?.uuid,
        role: userExists?.dataValues?.role,
        status: userExists?.dataValues?.status,
      });

      // SET ACCESS TOKEN
      await client.set(userExists?.dataValues?.uuid, accessToken, {
        EX: 86400,
      });
    }

    // GET USER'S PROFILE FROM DB
    const profile = await Profile.findOne({
      where: { user_id: userExists?.dataValues?.id },
    });

    // COMPILE PUBLIC USER'S DATA AND PROFILE
    const userData = {
      email: userExists?.dataValues?.email,
      phone_number: userExists?.dataValues?.phone_number,
      username: userExists?.dataValues?.username,
      display_name: profile?.dataValues?.display_name,
      photo_profile: profile?.dataValues?.photo_profile,
      about: profile?.dataValues?.about,
      role_id: userExists?.dataValues?.role_id,
      status_id: userExists?.dataValues?.status_id,
    };

    // SEND RESPONSE
    res
      .header("Authorization", `Bearer ${accessToken}`)
      .status(200)
      .json({ userData });
  } catch (error) {
    // CHECK IF THE ERROR COMES FROM VALIDATION
    if (error instanceof ValidationError) {
      return next({
        status: errorStatus.BAD_REQUEST_STATUS,
        message: error?.errors?.[0],
      });
    }

    // PASS TO GLOBAL ERROR HANDLER
    next(error);
  }
};
