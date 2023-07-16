// vw_conserved_articles
import { DataTypes } from "sequelize";
import db from "../../database/index.js";

export const ConservedArticles = db.sequelize.define(
  "conservedArticles",
  {
    conservation_id: {
      type: DataTypes.INTEGER,
    },

    conservator_id: {
      type: DataTypes.INTEGER,
    },

    conservator_username: {
      type: DataTypes.STRING(20),
    },

    article_id: {
      type: DataTypes.INTEGER,
    },

    profile_id: {
      type: DataTypes.INTEGER,
    },

    username: {
      type: DataTypes.STRING(20),
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

    mainshot: {
      type: DataTypes.STRING(255),
    },

    lede: {
      type: DataTypes.TEXT,
    },

    keywords: {
      type: DataTypes.TEXT("tiny"),
    },

    created_at: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "vw_conserved_articles",
    timestamps: false,
  }
);

ConservedArticles.removeAttribute("id");
