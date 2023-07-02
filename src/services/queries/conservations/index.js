/*--------------------------------------------------
INSERT
----------------------------------------------------*/
// placeholder values:
// [conservator, article_id]
const insertConservation =
  "INSERT INTO digging.conservations (`conservator`, `article_id`) VALUES (?, ?)";

/*--------------------------------------------------
SELECT
----------------------------------------------------*/

const selectMostConservedArticles = "SELECT * FROM most_conserved_articles";

// placeholder values:
// [article_id]
const countArticleConservators =
  "SELECT * FROM total_conservators WHERE article_id = ?";

/*--------------------------------------------------
DELETE
----------------------------------------------------*/
// placeholder values:
// [conservator, article_id]
const deleteConservation =
  "DELETE FROM digging.conservations WHERE `conservator` = ? AND `article_id` = ?";
