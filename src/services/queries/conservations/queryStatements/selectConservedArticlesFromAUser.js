/*--------------------------------------------------
SELECT CONSERVED ARTICLES FROM A USER
----------------------------------------------------*/

// placeholder values:
// ['conservator_username']
export const selectConservedArticlesFromAUser =
  "SELECT `conservator_username`, `article_id`, `author_username`, `category_id`, `category_name`, `headline`, `mainshot`, `lede`, `keywords`, `created_at` FROM all_conserved_articles_with_authors_username WHERE `conservator_username` = ?";
