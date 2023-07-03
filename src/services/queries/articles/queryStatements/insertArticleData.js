/*--------------------------------------------------
INSERT ARTICLE'S DATA
----------------------------------------------------*/

// placeholder values:
// [user_id, 'category_id', 'headline', 'subheadline', 'mainshot', 'mainshot_caption', 'lede', 'keywords', 'content', 'references']
export const insertArticleData =
  "INSERT INTO digging.articles (`user_id`, `category_id`, `headline`, `subheadline`, `mainshot`, `mainshot_caption`, `lede`, `keywords`, `content`, `references`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
