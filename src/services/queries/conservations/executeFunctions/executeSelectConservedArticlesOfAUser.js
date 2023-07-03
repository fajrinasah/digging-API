import { generateExecuteFunction } from "../../../../helpers/generateExecuteFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT CONSERVED ARTICLES OF A USER
----------------------------------------------------*/
// placeholder values:
// ['conservator_username']

export const executeSelectConservedArticlesOfAUser = ({
  conservator_username = "",
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
  if (!filterByCategory && !filterByHeadline && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        queryStatements.selectConservedArticlesOfAUser +
        " ORDER BY article_id ? LIMIT 45",
      placeholders: [conservator_username, sortingOption],
    });
    return;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        queryStatements.selectConservedArticlesOfAUser +
        " AND keywords LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [
        conservator_username,
        `%${filterByKeywords}%`,
        sortingOption,
      ],
    });
    return;
  }

  // filter by headline + sorting
  if (!filterByCategory && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        queryStatements.selectConservedArticlesOfAUser +
        " AND headline LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [
        conservator_username,
        `%${filterByHeadline}%`,
        sortingOption,
      ],
    });
    return;
  }

  // filter by category + filter by keywords + sorting
  if (!filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        queryStatements.selectConservedArticlesOfAUser +
        " AND category_id = ? AND keywords LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [
        conservator_username,
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
        queryStatements.selectConservedArticlesOfAUser +
        " AND category_id = ? AND headline LIKE ? ORDER BY article_id ? LIMIT 45",
      placeholders: [
        conservator_username,
        filterByCategory,
        `%${filterByHeadline}%`,
        sortingOption,
      ],
    });
    return;
  }
};
