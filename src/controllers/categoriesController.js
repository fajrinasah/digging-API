import { categories } from "../services/queries/categories/index.js";

export const categoriesController = {
  /*------------------------------------------------------------
  GET
  -------------------------------------------------------------*/
  getAllCategories: (req, res) => {
    categories.querySelectAllCategories();

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },
};
