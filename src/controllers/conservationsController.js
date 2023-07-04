import { conservations } from "../services/queries/conservations/index.js";

export const conservationsController = {
  /*------------------------------------------------------------
  GET
  -------------------------------------------------------------*/
  // GET CONSERVED ARTICLES FROM A USER
  getConservedArticlesFromUser: (req, res) => {
    // conservator's username
    const { username } = req.params;

    // get data from req query (if any)
    const categoryId = req.query.categoryId ? req.query.categoryId : 0;
    const headline = req.query.headline ? req.query.headline : "";
    const keywords = req.query.keywords ? req.query.keywords : "";
    const sort = req.query.sort ? req.query.sort : "DESC";

    conservations.executeSelectConservedArticlesFromAUser({
      conservator_username: username,
      filterByCategory: categoryId,
      filterByHeadline: headline,
      filterByKeywords: keywords,
      sortingOption: sort,
    });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // GET MOST CONSERVED ARTICLES
  getMostConservedArticles: (req, res) => {
    conservations.querySelectMostConservedArticles();

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // GET TOTAL OF AN ARTICLE'S CONSERVATORS
  getTotalConservators: (req, res) => {
    const { articleId } = req.params;

    conservations.executeCountArticleConservators({ article_id: articleId });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  /*------------------------------------------------------------
  POST
  -------------------------------------------------------------*/
  postConservation: (req, res) => {
    const { userId, articleId } = req.body;

    conservations.executeInsertConservation({
      conservator: userId,
      article_id: articleId,
    });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(results);
  },

  /*------------------------------------------------------------
  DELETE
  -------------------------------------------------------------*/
  deleteConservation: (req, res) => {
    const { userId, articleId } = req.body;

    conservations.executeDeleteConservation({
      conservator: userId,
      article_id: articleId,
    });
  },
};
