// vw_profiles_with_usernames
import { DataTypes } from "sequelize";
import db from "../../database/index.js";

export const WriterPublicData = db.sequelize.define(
  "mostConserved",
  {
    profile_id: {
      type: DataTypes.INTEGER,
    },

    username: {
      type: DataTypes.STRING(20),
    },

    display_name: {
      type: DataTypes.STRING(45),
    },

    photo_profile: {
      type: DataTypes.STRING(255),
    },

    about: {
      type: DataTypes.STRING(200),
    },
  },
  {
    tableName: "vw_profiles_with_usernames",
    timestamps: false,
  }
);

WriterPublicData.removeAttribute("id");
