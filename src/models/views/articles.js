// vw_articles_all
import { DataTypes } from "sequelize";
import db from "../../database/index.js";

export const Articles = db.sequelize.define(
  "articles",
  {
    profile_id: {
      type: DataTypes.INTEGER,
    },

    username: {
      type: DataTypes.STRING(20),
    },

    display_name: {
      type: DataTypes.STRING(45),
    },

    photo_profile: {
      type: DataTypes.STRING(100),
    },

    article_id: {
      type: DataTypes.INTEGER,
    },

    category_id: {
      type: DataTypes.INTEGER,
    },

    category_name: {
      type: DataTypes.STRING(45),
    },

    headline: {
      type: DataTypes.TEXT("tiny"),
    },

    subheadline: {
      type: DataTypes.TEXT("tiny"),
    },

    mainshot: {
      type: DataTypes.STRING(255),
    },

    mainshot_caption: {
      type: DataTypes.TEXT("tiny"),
    },

    lede: {
      type: DataTypes.TEXT,
    },

    keywords: {
      type: DataTypes.TEXT("tiny"),
    },

    content: {
      type: DataTypes.TEXT("long"),
    },

    references: {
      type: DataTypes.TEXT,
    },

    created_at: {
      type: DataTypes.DATE,
    },

    updated_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "vw_articles_all",
    timestamps: false,
  }
);

Articles.removeAttribute("id");
