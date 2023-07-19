import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import { Conservation } from "../../models/conservation.js";
import { Article } from "../../models/article.js";
import db from "../../database/index.js";

/*----------------------------------------------------*/
// POST CONSERVATION
/*----------------------------------------------------*/
export const postConservation = async (req, res, next) => {
  try {
    const { uuid } = req.user;
    const { articleId } = req.params;

    // CHECK IF ARTICLE EXISTS
    const article = await Article?.findOne({ where: { id: articleId } });

    if (!article)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.BAD_REQUEST + ": article not found.",
      };

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });

    if (!user || user?.dataValues?.status === 3)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // GET DATA FROM PROFILE
    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    // GET CONSERVATOR'S ID
    const conservator_id = profile?.dataValues?.id;

    // CHECK IF USER ALREADY CONSERVED THE ARTICLE
    const conservationExists = await Conservation?.findOne({
      where: {
        conservator_id,
        article_id: articleId,
      },
    });

    if (conservationExists)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message:
          errorMessage.BAD_REQUEST +
          ": article already conserved by this user.",
      };

    // INSERT CONSERVATION DATA INTO DB
    const conservation = await Conservation?.create({
      conservator_id,
      article_id: articleId,
    });

    delete conservation?.dataValues?.conservator_id;

    // SEND RESPONSE
    res.status(201).json({
      message: "Article was conserved successfully.",
      conservation,
    });
  } catch (error) {
    next(error);
  }
};
