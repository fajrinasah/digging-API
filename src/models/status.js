import { DataTypes } from "sequelize";
import db from "../database/index.js";

export const Status = db.sequelize.define(
  "status",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "statuses",
    timestamps: false,
  }
);
