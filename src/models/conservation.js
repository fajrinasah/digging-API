import { DataTypes } from "sequelize";
import db from "./index.js";

export const Conservation = db.sequelize.define(
  "conservation",
  {
    conservation_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    conservator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "conservations",
  }
);
