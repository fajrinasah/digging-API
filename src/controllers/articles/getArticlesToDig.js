import { Op } from "sequelize";

import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import {
  Article,
  Category,
  Profile,
  User,
} from "../../models/associations/index.js";

/*----------------------------------------------------*/
// GET ARTICLES TO DIG
/*----------------------------------------------------*/
export const getArticlesToDig = async (req, res, next) => {
  try {
    const { categoryId, headline, keywords, sort, page } = req.query;

    /*------------------------------------------------------*/
    // PAGINATION OPTIONS
    const options = {
      offset: page > 1 ? parseInt(page - 1) * 5 : 0,
      limit: page ? 5 : null,
    };

    /*------------------------------------------------------*/

    // WHERE CONDITION(S)
    const whereCondition = {};

    if (categoryId) {
      whereCondition.category_id = categoryId;
    }

    if (headline) {
      whereCondition.headline = { [Op.substring]: headline };
    }

    if (keywords) {
      whereCondition.keywords = { [Op.substring]: keywords };
    }

    console.log(whereCondition);

    /*------------------------------------------------------*/

    const article = await Article.findAll({
      attributes: { exclude: ["profile_id", "category_id"] },

      where: whereCondition,

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

      order: [sort === "ASC" ? ["id", "ASC"] : ["id", "DESC"]],

      // PAGINATION OPTIONS
      ...options,
    });

    const total_articles = article.length;

    const total_pages = page ? Math.ceil(total_articles / options.limit) : null;

    // CHECK IF THERE'S NO DATA
    if (!article.length)
      throw {
        status: errorStatus.NOT_FOUND_STATUS,
        message: errorMessage.DATA_NOT_FOUND,
      };

    // SEND RESPONSE
    res.status(200).json({
      page,
      total_pages,
      total_articles,
      articles_limit: options.limit,
      article,
    });
  } catch (error) {
    next(error);
  }
};
