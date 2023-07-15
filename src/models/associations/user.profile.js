import { User } from "../user.js";
import { Profile } from "../profile.js";

User.hasOne(Profile, {
  foreignKey: "user_id",
});

Profile.belongsTo(User, {
  foreignKey: "user_id",
});

export { User, Profile };
