import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
UPDATE ARTICLE'S DATA
----------------------------------------------------*/
// placeholder values:
// ['category_id', 'headline', 'subheadline', 'mainshot', 'mainshot_caption', 'lede', 'keywords', 'content', 'references', article_id]

export const executeUpdateArticleData = ({
  category_id = 0,
  headline = "",
  subheadline = "",
  mainshot = "",
  mainshot_caption = "",
  lede = "",
  keywords = "",
  content = "",
  references = "",
  article_id = 0,
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements.updateArticleData,
    placeholders: [
      category_id,
      headline,
      subheadline,
      mainshot,
      mainshot_caption,
      lede,
      keywords,
      content,
      references,
      article_id,
    ],
  });
};
