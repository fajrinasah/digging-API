import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";

/*--------------------------------------------------
SELECT PUBLISHED ARTICLES FROM A USER
(with filtering and sorting)
----------------------------------------------------*/

export const executeSelectPublishedArticlesFromUser = ({
  username = "",
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
  if (!filterByCategory && !filterByHeadline && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE username = ? ORDER BY article_id ? LIMIT 45",
      placeholders: [username, sortingOption],
    });
    return;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE username = ? AND keywords LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [username, `%${filterByKeywords}%`, sortingOption],
    });
    return;
  }

  // filter by headline + sorting
  if (!filterByCategory && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE username = ? AND headline LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [username, `%${filterByHeadline}%`, sortingOption],
    });
    return;
  }

  // filter by category + filter by keywords + sorting
  if (!filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE username = ? AND category_id = ? AND keywords LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [
        username,
        filterByCategory,
        `%${filterByKeywords}%`,
        sortingOption,
      ],
    });
    return;
  }

  // filter by category + filter by headline + sorting
  if (!filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE username = ? AND category_id = ? AND headline LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [
        username,
        filterByCategory,
        `%${filterByHeadline}%`,
        sortingOption,
      ],
    });
    return;
  }
};
