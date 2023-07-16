import { DataTypes } from "sequelize";
import db from "../database/index.js";

export const Conservation = db.sequelize.define(
  "conservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
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
