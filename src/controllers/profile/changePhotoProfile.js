import { ValidationError } from "yup";
import { v2 as cloudinary } from "cloudinary";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as validation from "./validationSchemata/index.js";
import chalk from "chalk";

/*----------------------------------------------------*/
// CHANGE PHOTO PROFILE
/*----------------------------------------------------*/
export const changePhotoProfile = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    // CHECK IF FILE IS UPLOADED
    if (!req.file) {
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.BAD_REQUEST + "Please upload an image.",
      }();
    }

    console.log(req.file);

    // CHECK CURRENT PHOTO PROFILE
    const user = await User?.findOne({
      where: { uuid },
    });

    // DELETE CURRENT PHOTO PROFILE FROM CLOUDINARY
    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    const currentPhotoProfile = profile?.dataValues?.photo_profile;

    cloudinary.v2.uploader
      .destroy(currentPhotoProfile)
      .then((result) =>
        console.log(result + `. Image was destroyed successfully`)
      );

    // UPDATE PHOTO PROFILE IN PROFILE DATA
    await Profile?.update(
      { photo_profile: req?.file?.path },
      { where: { id: profile?.dataValues?.id } }
    );

    // SEND RESPONSE
    res.status(200).json({
      message: "Image was updated successfully.",
      photoUrl: req.file?.path,
    });
  } catch (error) {
    next(error);
  }
};
