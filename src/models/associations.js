import { Article } from "./article.js";
import { Category } from "./category.js";
import { Conservation } from "./conservation.js";
import { Profile } from "./profile.js";
import { User } from "./user.js";
// import { Role } from "./role.js";
// import { Status } from "./status.js";

export const associations = () => {
  // // USER & ROLE
  // Role.hasMany(User);

  // User.belongsTo(Role, {
  //   targetKey: "id",
  //   foreignKey: "role_id",
  // });

  // /*-----------------------------------------*/
  // // USER & STATUS
  // Status.hasMany(User);

  // User.belongsTo(Status, {
  //   targetKey: "id",
  //   foreignKey: "status_id",
  // });

  /*-----------------------------------------*/

  // USER & PROFILE
  // User.hasOne(Profile, {
  //   sourceKey: "id",
  //   foreignKey: "user_id",
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // });

  User.hasOne(Profile);

  Profile.belongsTo(User, {
    foreignKey: "user_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  /*-----------------------------------------*/

  // PROFILE & ARTICLE
  // Profile.hasMany(Article, {
  //   foreignKey: {
  //     name: "profile_id",
  //   },
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // });

  Profile.hasMany(Article);

  Article.belongsTo(Profile, {
    foreignKey: "profile_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  /*-----------------------------------------*/

  // CATEGORY & ARTICLE
  // Category.hasMany(Article, {
  //   foreignKey: {
  //     name: "category_id",
  //   },
  //   onUpdate: "CASCADE",
  //   onDelete: "SET NULL",
  // });

  Category.hasMany(Article);

  Article.belongsTo(Category, {
    foreignKey: "category_id",
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  });

  /*-----------------------------------------*/

  // PROFILE & CONSERVATION
  // Profile.hasMany(Conservation, {
  //   foreignKey: {
  //     name: "conservator_id",
  //   },
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // });

  Profile.hasMany(Conservation);

  Conservation.belongsTo(Profile, {
    foreignKey: "conservator_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });

  /*-----------------------------------------*/

  // ARTICLE & CONSERVATION
  // Article.hasMany(Conservation, {
  //   foreignKey: {
  //     name: "article_id",
  //   },
  //   onUpdate: "CASCADE",
  //   onDelete: "CASCADE",
  // });

  Article.hasMany(Conservation);

  Conservation.belongsTo(Article, {
    foreignKey: "article_id",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  });
};
