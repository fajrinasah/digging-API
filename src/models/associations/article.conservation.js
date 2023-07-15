import { Article } from "../article.js";
import { Conservation } from "../conservation.js";

Article.hasMany(Conservation, {
  foreignKey: "article_id",
});

Conservation.belongsTo(Article, {
  foreignKey: "article_id",
});

export { Article, Conservation };
