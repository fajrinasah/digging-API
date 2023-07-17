/*--------------------------------------------------
SELECT CAROUSEL ARTICLES
----------------------------------------------------*/
// placeholder values:
// [limit]
export const selectCarouselArticles =
  "SELECT * FROM vw_articles_all ORDER BY article_id DESC LIMIT ?";
