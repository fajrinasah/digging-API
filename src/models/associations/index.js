import { Article } from "../article.js";
import { Category } from "../category.js";
import { Conservation } from "../conservation.js";
import { Profile } from "../profile.js";
import { User } from "../user.js";

// ARTICLE & CONSERVATION
Article.hasMany(Conservation, {
  foreignKey: "article_id",
});

Conservation.belongsTo(Article, {
  foreignKey: "article_id",
});

// CATEGORY & ARTICLE
Category.hasMany(Article, {
  foreignKey: "category_id",
});

Article.belongsTo(Category, {
  foreignKey: "category_id",
});

// PROFILE & ARTICLE
Profile.hasMany(Article, {
  foreignKey: "profile_id",
});

Article.belongsTo(Profile, {
  foreignKey: "profile_id",
});

// PROFILE & CONSERVATION
Profile.hasMany(Conservation, {
  foreignKey: "conservator_id",
});

Conservation.belongsTo(Profile, {
  foreignKey: "conservator_id",
});

// USER & PROFILE
User.hasOne(Profile, {
  foreignKey: "user_id",
});

Profile.belongsTo(User, {
  foreignKey: "user_id",
});

export { Article, Category, Conservation, Profile, User };
