/*--------------------------------------------------
SELECT CAROUSEL ARTICLES
----------------------------------------------------*/
// placeholder values:
// [limit]
export const selectCarouselArticles =
  "SELECT * FROM articles_to_dig ORDER BY article_id DESC LIMIT ?";
