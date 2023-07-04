import { articles } from "../services/queries/articles/index.js";

export const articlesController = {
  /*------------------------------------------------------------
  GET
  -------------------------------------------------------------*/
  // GET ARTICLE'S DATA
  getArticleData: (req, res) => {
    const { articleId } = req.params;
    articles.executeSelectArticleData({ article_id: articleId });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // GET ARTICLES TO DIG
  getArticlesToDig: (req, res) => {
    // get data from req query (if any)
    const categoryId = req.query?.categoryId ? req.query.categoryId : 0;
    const headline = req.query?.headline ? req.query.headline : "";
    const keywords = req.query?.keywords ? req.query.keywords : "";
    const sort = req.query?.sort ? req.query.sort : "DESC";

    articles.executeSelectArticlesToDig({
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

  // GET CAROUSEL ARTICLES
  getCarouselArticles: (req, res) => {
    const { totalArticles } = req.params;
    articles.executeSelectCarouselArticles({ limit: totalArticles });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  // GET PUBLISHED ARTICLES FROM A USER
  getPublishedArticlesFromUser: (req, res) => {
    // conservator's username
    const { username } = req.params;

    // get data from req query (if any)
    const categoryId = req.query.categoryId ? req.query.categoryId : 0;
    const headline = req.query.headline ? req.query.headline : "";
    const keywords = req.query.keywords ? req.query.keywords : "";
    const sort = req.query.sort ? req.query.sort : "DESC";

    articles.executeSelectPublishedArticlesFromUser({
      username,
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

  // GET TOTAL ARTICLES IN A CATEGORY
  getTotalArticlesInACategory: (req, res) => {
    const { categoryId } = req.params;

    articles.executeCountArticlesInACategory({ category_id: categoryId });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  /*------------------------------------------------------------
  POST
  -------------------------------------------------------------*/
  postArticleData: (req, res) => {
    const {
      userId,
      categoryId,
      headline,
      subheadline,
      mainshot,
      mainshotCaption,
      lede,
      keywords,
      content,
      references,
    } = req.body;

    articles.executeInsertArticleData({
      user_id: userId,
      category_id: categoryId,
      headline,
      subheadline,
      mainshot,
      mainshot_caption: mainshotCaption,
      lede,
      keywords,
      content,
      references,
    });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(201).send(results);
  },

  /*------------------------------------------------------------
  PATCH
  -------------------------------------------------------------*/
  patchArticleData: (req, res) => {
    const { articleId } = req.params;

    const {
      categoryId,
      headline,
      subheadline,
      mainshot,
      mainshotCaption,
      lede,
      keywords,
      content,
      references,
    } = req.body;

    articles.executeUpdateArticleData({
      category_id: categoryId,
      headline,
      subheadline,
      mainshot,
      mainshot_caption: mainshotCaption,
      lede,
      keywords,
      content,
      references,
      article_id: articleId,
    });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },

  /*------------------------------------------------------------
  DELETE
  -------------------------------------------------------------*/
  deleteArticleData: (req, res) => {
    const { articleId } = req.params;

    articles.executeDeleteArticleData({ article_id: articleId });

    if (err) {
      return res.status(500).send(err);
    }

    return res.status(200).send(results);
  },
};
