import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import db from "../../database/index.js";
import {
  Article,
  Category,
  Conservation,
  Profile,
  User,
} from "../../models/associations/index.js";

/*----------------------------------------------------*/
// GET MOST CONSERVED ARTICLES IN A CATEGORY
/*----------------------------------------------------*/
export const getMostConservedArticlesInCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const most_conserved = await Conservation.findAll({
      attributes: [
        "article_id",
        [
          db.sequelize.fn("COUNT", db.sequelize.col(`conservator_id`)),
          "conservators",
        ],
      ],

      group: "article_id",

      include: {
        model: Article,
        where: { category_id: categoryId },
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
      },

      order: [["conservators", "DESC"]],
    });

    // CHECK IF THERE'S NO DATA
    if (!most_conserved.length)
      throw {
        status: errorStatus.NOT_FOUND_STATUS,
        message: errorMessage.DATA_NOT_FOUND,
      };

    // SEND RESPONSE
    res.status(200).json({
      most_conserved,
    });
  } catch (error) {
    next(error);
  }
};
