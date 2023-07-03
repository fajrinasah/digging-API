const selectArticlesToDig = ({
  filterByCategory = 0,
  filterByHeadline = "",
  filterByKeywords = "",
  sortingOption = "DESC",
}) => {
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

// DESC
let query = selectArticlesToDig({});
// console.log(query);

// ASC
let query2 = selectArticlesToDig({ sortingOption: "ASC" });
console.log(query2);

// // keywords + ASC
let query3 = selectArticlesToDig({
  filterByKeywords: "test",
  sortingOption: "ASC",
});
// console.log(query3);

// headline + ASC
let query4 = selectArticlesToDig({
  filterByHeadline: "test",
  sortingOption: "ASC",
});
// console.log(query4);

// category + keywords + ASC
let query5 = selectArticlesToDig({
  filterByCategory: 1,
  filterByKeywords: "test",
  sortingOption: "ASC",
});
// console.log(query5);

// category + headline + ASC
let query6 = selectArticlesToDig({
  filterByCategory: 1,
  filterByHeadline: "test",
  sortingOption: "ASC",
});
// console.log(query6);
