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

// DESC
let query = selectPublishedArticlesFromUser({ username: "orion1" });
// console.log(query);

// ASC
let query2 = selectPublishedArticlesFromUser({
  username: "orion1",
  sortingOption: "ASC",
});
// console.log(query2);

// // keywords + ASC
let query3 = selectPublishedArticlesFromUser({
  username: "orion1",
  filterByKeywords: "test",
  sortingOption: "ASC",
});
// console.log(query3);

// headline + ASC
let query4 = selectPublishedArticlesFromUser({
  username: "orion1",
  filterByHeadline: "test",
  sortingOption: "ASC",
});
// console.log(query4);

// category + keywords + ASC
let query5 = selectPublishedArticlesFromUser({
  username: "orion1",
  filterByCategory: 1,
  filterByKeywords: "test",
  sortingOption: "ASC",
});
// console.log(query5);

// category + headline + ASC
let query6 = selectPublishedArticlesFromUser({
  username: "orion1",
  filterByCategory: 1,
  filterByHeadline: "test",
  sortingOption: "ASC",
});
console.log(query6);
