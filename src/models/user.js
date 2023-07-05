import { DataTypes } from "sequelize";
import db from "./index.js";

export const User = db.sequelize.define(
  "user",
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    phone_number: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },

    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  },
  {
    tableName: "users",
  }
);
