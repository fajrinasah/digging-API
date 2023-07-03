/*--------------------------------------------------
SELECT CAROUSEL ARTICLES
----------------------------------------------------*/
export const selectCarouselArticles =
  "SELECT * FROM articles_to_dig ORDER BY article_id DESC LIMIT 5";
