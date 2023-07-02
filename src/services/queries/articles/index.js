/*--------------------------------------------------
INSERT
----------------------------------------------------*/

// placeholder values:
// ['user_id', 'category_id', 'headline', 'subheadline', 'mainshot', 'mainshot_caption', 'lede', 'keywords', 'content', 'references']
const insertArticleData =
  "INSERT INTO digging.articles (`user_id`, `category_id`, `headline`, `subheadline`, `mainshot`, `mainshot_caption`, `lede`, `keywords`, `content`, `references`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

/*--------------------------------------------------
SELECT
----------------------------------------------------*/

const selectCarouselArticles =
  "SELECT * FROM articles_to_dig ORDER BY article_id DESC LIMIT 5";

// placeholder values:
// []
const selectArticlesToDig = (
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC"
) => {
  if (!filterByCategory && !filterByHeadline && !filterByKeywords) {
    return `SELECT * FROM articles_to_dig ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    return `SELECT * FROM articles_to_dig WHERE keywords LIKE '%${filterByKeywords}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by headline + sorting
  if (!filterByCategory && !filterByKeywords) {
    return `SELECT * FROM articles_to_dig WHERE headline LIKE '%${filterByHeadline}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by category + filter by keywords + sorting
  if (!filterByHeadline) {
    return `SELECT * FROM articles_to_dig WHERE category_id = ${filterByCategory} AND keywords LIKE '%${filterByKeywords}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by category + filter by headline + sorting
  if (!filterByKeywords) {
    return `SELECT * FROM articles_to_dig WHERE category_id = ${filterByCategory} AND headline LIKE '%${filterByHeadline}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }
};

// placeholder values:
// [article_id]
const selectArticleData = "SELECT * FROM all_articles WHERE `article_id` = ?";

const selectPublishedArticlesFromUser = (
  username = "",
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC"
) => {
  const mainQuery = selectArticlesToDig(
    filterByCategory,
    filterByHeadline,
    filterByKeywords,
    sortingOption
  );
  return mainQuery + username;
};

// placeholder values:
// [category_id]
const countArticlesInACategory =
  "SELECT `category_id`, COUNT(*) as `total_articles` FROM digging.articles GROUP BY  `category_id` HAVING `category_id` = ?";

/*--------------------------------------------------
UPDATE
----------------------------------------------------*/
// placeholder values:
// ['category_id', 'headline', 'subheadline', 'mainshot', 'mainshot_caption', 'lede', 'keywords', 'content', 'references', article_id]
const updateArticleData =
  "UPDATE digging.articles SET `category_id` = ?, `headline` = ?, `subheadline` = ?, `mainshot` = ?, `mainshot_caption` = ?, `lede` = ?, `keywords` = ?, `content` = ?, `references` = ?) WHERE `article_id` = ?";

/*--------------------------------------------------
DELETE
----------------------------------------------------*/
// placeholder values:
// [article_id]
const deleteArticleData = "DELETE FROM digging.articles WHERE `article_id` = ?";
