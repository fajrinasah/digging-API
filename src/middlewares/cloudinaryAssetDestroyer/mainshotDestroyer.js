import { v2 as cloudinary } from "cloudinary";

import { User, Profile } from "../../models/associations/user.profile.js";
import { Article } from "../../models/article.js";
import * as config from "../../configs/index.js";
import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";

export async function mainshotDestroyer(req, res, next) {
  try {
    const { uuid } = req.user;
    const { articleId } = req.params;

    // CHECK IF USER IS ALSO THE ARTICLE'S WRITER
    const user = await User?.findOne({
      where: { uuid },
    });

    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    const article = await Article?.findOne({
      where: { id: articleId },
    });

    const userIsWriter =
      profile?.dataValues?.id === article?.dataValues?.profile_id;

    // ONLY ARTICLE'S WRITER CAN EDIT ARTICLE'S DATA
    if (!userIsWriter)
      throw {
        status: errorStatus.UNAUTHORIZED_STATUS,
        message:
          errorMessage.UNAUTHORIZED +
          `: only article's writer can change article's mainshot.`,
      };

    // DELETE CURRENT MAINSHOT FROM CLOUDINARY
    const currentMainshot = article?.dataValues?.mainshot;

    // GET IMAGE'S PUBLIC ID FROM PROVIDED URL
    const splitted = currentMainshot.split("/");
    const imgName = splitted[8].split(".").splice(0, 1);
    const publicId = `${splitted[7]}/${imgName[0]}`;

    // CLOUDINARY CONFIG
    cloudinary.config({
      cloud_name: config.CLOUDINARY_CLOUD_NAME,
      api_key: config.CLOUDINARY_API_KEY,
      api_secret: config.CLOUDINARY_API_SECRET,
    });

    cloudinary.uploader.destroy(publicId, function (result) {
      console.log(
        result +
          `. Old image with public ID ${publicId} was destroyed successfully`
      );
    });

    next();
  } catch (error) {
    next(error);
  }
}
