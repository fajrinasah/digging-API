/*--------------------------------------------------
(SELECT) COUNT TOTAL ARTICLES OF A CATEGORY
----------------------------------------------------*/
// placeholder values:
// [category_id]
export const countArticlesInACategory =
  "SELECT `category_id`, COUNT(*) as `total_articles` FROM articles GROUP BY  `category_id` HAVING `category_id` = ?";
