import { DataTypes } from "sequelize";
import db from "./index.js";

export const Profile = db.sequelize.define(
  "profile",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    display_name: {
      type: DataTypes.STRING(45),
      defaultValue: null,
    },

    photo_profile: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },

    about: {
      type: DataTypes.STRING(200),
      defaultValue: null,
    },
  },
  {
    tableName: "profiles",
    timestamps: false,
  }
);
