import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";

/*--------------------------------------------------
SELECT ARTICLES TO DIG
(with filtering and sorting)
----------------------------------------------------*/

export const executeSelectArticlesToDig = ({
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
  if (!filterByCategory && !filterByHeadline && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig ORDER BY article_id ? LIMIT 45",
      placeholders: [sortingOption],
    });
    return;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE keywords LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [`%${filterByKeywords}%`, sortingOption],
    });
    return;
  }

  // filter by headline + sorting
  if (!filterByCategory && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE headline LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [`%${filterByHeadline}%`, sortingOption],
    });
    return;
  }

  // filter by category + filter by keywords + sorting
  if (!filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE category_id = ? AND keywords LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [filterByCategory, `%${filterByKeywords}%`, sortingOption],
    });
    return;
  }

  // filter by category + filter by headline + sorting
  if (!filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        "SELECT * FROM articles_to_dig WHERE category_id = ? AND headline LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [filterByCategory, `%${filterByHeadline}%`, sortingOption],
    });
    return;
  }
};
