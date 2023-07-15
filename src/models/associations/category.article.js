import { Category } from "../category.js";
import { Article } from "../article.js";

Category.hasMany(Article, {
  foreignKey: "category_id",
});

Article.belongsTo(Category, {
  foreignKey: "category_id",
});

export { Category, Article };
