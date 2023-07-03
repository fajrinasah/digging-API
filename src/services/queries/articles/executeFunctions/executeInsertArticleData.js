import { generateExecuteFunction } from "../../../../helpers/generateConnectionFunction.js";
import { queryStatements } from "../queryStatements/index.js";

/*--------------------------------------------------
INSERT ARTICLE'S DATA
----------------------------------------------------*/
// placeholder values:
// ['user_id', 'category_id', 'headline', 'subheadline', 'mainshot', 'mainshot_caption', 'lede', 'keywords', 'content', 'references']

export const executeInsertArticleData = ({
  user_id = 0,
  category_id = 0,
  headline = "",
  subheadline = "",
  mainshot = "",
  mainshot_caption = "",
  lede = "",
  keywords = "",
  content = "",
  references = "",
}) => {
  generateExecuteFunction({
    queryStatements: queryStatements,
    placeholders: [
      user_id,
      category_id,
      headline,
      subheadline,
      mainshot,
      mainshot_caption,
      lede,
      keywords,
      content,
      references,
    ],
  });
};
