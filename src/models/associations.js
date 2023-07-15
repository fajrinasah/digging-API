import { Article } from "./article.js";
import { Category } from "./category.js";
import { Conservation } from "./conservation.js";
import { Profile } from "./profile.js";
import { User } from "./user.js";
// import { Role } from "./role.js";
// import { Status } from "./status.js";

export const associations = () => {
  User.hasOne(Profile);

  Profile.belongsTo(User, {
    foreignKey: "user_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  /*-----------------------------------------*/

  Profile.hasMany(Article);

  Article.belongsTo(Profile, {
    foreignKey: "profile_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  /*-----------------------------------------*/

  Category.hasMany(Article);

  Article.belongsTo(Category, {
    foreignKey: "category_id",
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });

  /*-----------------------------------------*/

  Profile.hasMany(Conservation);

  Conservation.belongsTo(Profile, {
    foreignKey: "conservator_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  /*-----------------------------------------*/

  Article.hasMany(Conservation);

  Conservation.belongsTo(Article, {
    foreignKey: "article_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};
