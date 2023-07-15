import { Profile } from "../profile.js";
import { Article } from "../article.js";

Profile.hasMany(Article, {
  foreignKey: "profile_id",
});

Article.belongsTo(Profile, {
  foreignKey: "profile_id",
});

export { Profile, Article };
