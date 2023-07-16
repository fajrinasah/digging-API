import { DataTypes } from "sequelize";
import db from "../database/index.js";

export const Article = db.sequelize.define(
  "article",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    profile_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    category_id: {
      type: DataTypes.INTEGER,
      defaultValue: null,
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
      type: DataTypes.TEXT("long"),
      allowNull: false,
    },

    references: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    tableName: "articles",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
