/*--------------------------------------------------
SELECT CONSERVED ARTICLES FROM A USER (AS A CONSERVATOR)
----------------------------------------------------*/
// placeholder values:
// ['conservator_username']
export const selectConservedArticlesFromAUser =
  "SELECT * FROM vw_conserved_articles WHERE `conservator_username` = ?";
