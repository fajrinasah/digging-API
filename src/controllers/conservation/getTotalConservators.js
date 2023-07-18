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
// GET TOTAL OF AN ARTICLE'S CONSERVATORS
/*----------------------------------------------------*/
export const getTotalConservators = async (req, res, next) => {
  try {
    const { articleId } = req.params;

    const conservators = await Conservation.findAll({
      where: { article_id: articleId },

      attributes: [
        "article_id",
        [
          db.sequelize.fn("COUNT", db.sequelize.col(`conservator_id`)),
          "total_conservators",
        ],
      ],

      group: "article_id",

      order: [["total_conservators", "DESC"]],
    });

    // CHECK IF THERE'S NO DATA
    if (!conservators.length)
      throw {
        status: errorStatus.NOT_FOUND_STATUS,
        message: errorMessage.DATA_NOT_FOUND,
      };

    // SEND RESPONSE
    res.status(200).json({
      conservators,
    });
  } catch (error) {
    next(error);
  }
};
