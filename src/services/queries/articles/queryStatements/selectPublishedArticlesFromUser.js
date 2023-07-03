/*--------------------------------------------------
SELECT PUBLISHED ARTICLES FROM A USER
(with filtering and sorting)
----------------------------------------------------*/

const selectPublishedArticlesFromUser = ({
  username = "",
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
  if (
    !filterByCategory &&
    !filterByHeadline &&
    !filterByKeywords &&
    sortingOption
  ) {
    return `SELECT * FROM articles_to_dig WHERE username = ${username} ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    return `SELECT * FROM articles_to_dig WHERE username = ${username} AND keywords LIKE '%${filterByKeywords}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by headline + sorting
  if (!filterByCategory && !filterByKeywords) {
    return `SELECT * FROM articles_to_dig WHERE username = ${username} AND headline LIKE '%${filterByHeadline}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by category + filter by keywords + sorting
  if (!filterByHeadline) {
    return `SELECT * FROM articles_to_dig WHERE username = ${username} AND category_id = ${filterByCategory} AND keywords LIKE '%${filterByKeywords}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by category + filter by headline + sorting
  if (!filterByKeywords) {
    return `SELECT * FROM articles_to_dig WHERE username = ${username} AND category_id = ${filterByCategory} AND headline LIKE '%${filterByHeadline}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }
};
