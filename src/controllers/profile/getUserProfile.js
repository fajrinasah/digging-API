import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";

/*----------------------------------------------------*/
// GET USER'S PROFILE
/*----------------------------------------------------*/
export const getUserProfile = async (req, res, next) => {
  try {
    // GET USERNAME FROM REQ.PARAMS
    const { username } = req.params;

    // FIND USER'S DATA
    const user = await User?.findOne({
      where: { username },
    });

    // CHECK IF USER EXISTS
    if (!user || user?.dataValues?.status === 3)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // GET PROFILE DATA
    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    // COMPILE PUBLIC USER'S DATA AND PROFILE
    const userData = {
      username,
      display_name: profile?.dataValues?.display_name,
      photo_profile: profile?.dataValues?.photo_profile,
      about: profile?.dataValues?.about,
    };

    // SEND RESPONSE
    res.status(200).json({
      userData,
    });
  } catch (error) {
    next(error);
  }
};
