import { DataTypes } from "sequelize";
import db from "./index.js";

export const User = db.sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },

    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },

    phone_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },

    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },

    status_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },

    otp: {
      type: DataTypes.STRING(10),
      defaultValue: null,
    },

    otp_exp: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
