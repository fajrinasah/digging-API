import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import db from "../../database/index.js";
import { Article } from "../../models/associations/index.js";
/*----------------------------------------------------*/
// GET TOTAL ARTICLES IN A CATEGORY
/*----------------------------------------------------*/
export const getTotalArticlesInACategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const articles = await Article?.findAll({
      where: { category_id: categoryId },

      attributes: [
        "category_id",
        [db.sequelize.fn("COUNT", db.sequelize.col(`id`)), "total_articles"],
      ],

      group: "category_id",

      order: [["total_articles", "DESC"]],
    });

    // CHECK IF THERE'S NO DATA
    if (!articles.length)
      throw {
        status: errorStatus.NOT_FOUND_STATUS,
        message: errorMessage.DATA_NOT_FOUND,
      };

    // SEND RESPONSE
    res.status(200).json({
      articles,
    });
  } catch (error) {
    next(error);
  }
};
