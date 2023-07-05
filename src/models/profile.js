import { DataTypes } from "sequelize";
import db from "./index.js";

export const Profile = db.sequelize.define(
  "profile",
  {
    profile_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    photo_profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    about: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "profiles",
  }
);
