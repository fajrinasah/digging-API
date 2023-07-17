/*--------------------------------------------------
SELECT ARTICLES TO DIG
(with filtering and sorting)
----------------------------------------------------*/
export const selectArticlesToDig = ({
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
  if (!filterByCategory && !filterByHeadline && !filterByKeywords) {
    return `SELECT * FROM vw_articles_all ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    return `SELECT * FROM vw_articles_all WHERE keywords LIKE '%${filterByKeywords}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by headline + sorting
  if (!filterByCategory && !filterByKeywords) {
    return `SELECT * FROM vw_articles_all WHERE headline LIKE '%${filterByHeadline}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by category + filter by keywords + sorting
  if (!filterByHeadline) {
    return `SELECT * FROM vw_articles_all WHERE category_id = ${filterByCategory} AND keywords LIKE '%${filterByKeywords}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }

  // filter by category + filter by headline + sorting
  if (!filterByKeywords) {
    return `SELECT * FROM vw_articles_all WHERE category_id = ${filterByCategory} AND headline LIKE '%${filterByHeadline}%' ORDER BY article_id ${sortingOption} LIMIT 45`;
  }
};
