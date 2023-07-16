// vw_most_conserved
import { DataTypes } from "sequelize";
import db from "../../database/index.js";

export const MostConserved = db.sequelize.define(
  "mostConserved",
  {
    article_id: {
      type: DataTypes.INTEGER,
    },

    username: {
      type: DataTypes.STRING(20),
    },

    total_conservators: {
      type: DataTypes.BIGINT,
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
    tableName: "vw_most_conserved",
    timestamps: false,
  }
);

MostConserved.removeAttribute("id");
