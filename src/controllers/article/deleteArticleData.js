import { v2 as cloudinary } from "cloudinary";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { Article } from "../../models/article.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import db from "../../database/index.js";
import * as config from "../../configs/index.js";

/*----------------------------------------------------*/
// DELETE ARTICLE'S DATA
/*----------------------------------------------------*/
export const deleteArticleData = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

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

    // ONLY ARTICLE'S WRITER CAN DELETE ARTICLE'S DATA
    if (!userIsWriter)
      throw {
        status: errorStatus.UNAUTHORIZED_STATUS,
        message:
          errorMessage.UNAUTHORIZED +
          `: only article's writer can delete article's data.`,
      };

    // DELETE ARTICLE'S DATA
    await Article.destroy({
      where: { id: articleId },
    });

    // DELETE CURRENT PHOTO PROFILE FROM CLOUDINARY (IF ANY)
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

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({ message: "Article was deleted successfully." });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};
