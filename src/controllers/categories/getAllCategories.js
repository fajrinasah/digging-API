import { Category } from "../../models/category.js";

/*----------------------------------------------------*/
// GET ALL CATEGORIES
/*----------------------------------------------------*/
export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category?.findAll();

    // SEND RESPONSE
    res.status(200).json({
      categories,
    });
  } catch (error) {
    next(error);
  }
};
