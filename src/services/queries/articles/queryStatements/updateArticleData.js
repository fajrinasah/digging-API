/*--------------------------------------------------
UPDATE ARTICLE'S DATA
----------------------------------------------------*/
// placeholder values:
// ['category_id', 'headline', 'subheadline', 'mainshot', 'mainshot_caption', 'lede', 'keywords', 'content', 'references', article_id]
export const updateArticleData =
  "UPDATE digging.articles SET `category_id` = ?, `headline` = ?, `subheadline` = ?, `mainshot` = ?, `mainshot_caption` = ?, `lede` = ?, `keywords` = ?, `content` = ?, `references` = ?) WHERE `article_id` = ?";
