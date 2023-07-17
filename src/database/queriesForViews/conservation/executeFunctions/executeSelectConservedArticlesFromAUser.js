import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import * as queryStatements from "../queryStatements/index.js";

/*--------------------------------------------------
SELECT CONSERVED ARTICLES FROM A USER
----------------------------------------------------*/
// placeholder values:
// ['conservator_username']

export const executeSelectConservedArticlesFromAUser = ({
  conservator_username = "",
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
  if (!filterByCategory && !filterByHeadline && !filterByKeywords) {
    generateExecuteFunction({
      queryStatements:
        queryStatements.selectConservedArticlesFromAUser +
        " ORDER BY article_id ? LIMIT 45",
      placeholders: [conservator_username, sortingOption],
    });
    return;
  }

  // filter by keywords + sorting
  if (!filterByCategory && !filterByHeadline) {
    generateExecuteFunction({
      queryStatements:
        queryStatements.selectConservedArticlesFromAUser +
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
        queryStatements.selectConservedArticlesFromAUser +
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
        queryStatements.selectConservedArticlesFromAUser +
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
        queryStatements.selectConservedArticlesFromAUser +
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
