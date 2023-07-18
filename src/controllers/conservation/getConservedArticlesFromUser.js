import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import * as errorMessage from "../../middlewares/globalErrorHandler/errorMessage.js";
import {
  Article,
  Category,
  Conservation,
  Profile,
  User,
} from "../../models/associations/index.js";

/*----------------------------------------------------*/
// GET ARTICLE'S DATA
/*----------------------------------------------------*/
export const getConservedArticlesFromUser = async (req, res, next) => {
  try {
    // conservator's username
    const { username } = req.params;

    const { categoryId, headline, keywords, sort, page } = req.query;

    // conservator's data
    const user = await User?.findOne({
      where: { username },
    });

    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    const conservator = profile?.dataValues?.id;

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

    const conservation = await Conservation.findAll({
      attributes: { exclude: ["conservator_id", "article_id"] },

      where: { conservator_id: conservator },

      order: [sort === "ASC" ? ["id", "ASC"] : ["id", "DESC"]],

      include: {
        model: Article,
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
      },

      // PAGINATION OPTIONS
      ...options,
    });

    // COUNT TOTAL OF CONSERVATIONS
    const total_conservations = await Conservation?.count({
      where: { conservator_id: conservator },
    });

    const total_pages = page
      ? Math.ceil(total_conservations / options.limit)
      : null;

    // CHECK IF THERE'S NO DATA
    if (!conservation.length)
      throw {
        status: errorStatus.NOT_FOUND_STATUS,
        message: errorMessage.DATA_NOT_FOUND,
      };

    // SEND RESPONSE
    res.status(200).json({
      page,
      total_pages,
      total_conservations,
      conservations_limit: options.limit,
      conservation,
    });
  } catch (error) {
    next(error);
  }
};
