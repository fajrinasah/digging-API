import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import {
  Article,
  Category,
  Profile,
  User,
} from "../../models/associations/index.js";

/*----------------------------------------------------*/
// GET CAROUSEL ARTICLES
/*----------------------------------------------------*/
export const getCarouselArticles = async (req, res, next) => {
  try {
    const { totalArticles } = req.params;

    const limit = parseInt(totalArticles);

    const article = await Article?.findAll({
      attributes: { exclude: ["profile_id", "category_id"] },

      include: [
        {
          model: Category,
          attributes: ["id", ["category", "name"]],
          required: true,
        },
        {
          model: Profile,
          attributes: ["display_name", "photo_profile", "about"],
          include: {
            model: User,
            attributes: ["username"],
            required: true,
          },
          required: true,
        },
      ],

      order: [["id", "DESC"]],

      limit: limit,
    });

    // CHECK IF THERE'S NO DATA
    if (!article.length)
      throw {
        status: errorStatus.NOT_FOUND_STATUS,
        message: errorMessage.DATA_NOT_FOUND,
      };

    // SEND RESPONSE
    res.status(200).json({
      article,
    });
  } catch (error) {
    next(error);
  }
};
