import { DataTypes } from "sequelize";
import db from "./index.js";

export const Article = db.sequelize.define(
  "article",
  {
    article_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    headline: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },

    subheadline: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },

    mainshot: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },

    mainshot_caption: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },

    lede: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    keywords: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },

    content: {
      type: DataTypes.TEXT("tiny"),
      allowNull: false,
    },

    references: {
      type: DataTypes.TEXT("tiny"),
      allowNull: true,
    },
  },
  {
    tableName: "articles",
  }
);
