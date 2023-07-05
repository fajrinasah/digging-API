import { DataTypes } from "sequelize";
import db from "./index.js";

export const Category = db.sequelize.define(
  "category",
  {
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    category_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "categories",
  }
);
