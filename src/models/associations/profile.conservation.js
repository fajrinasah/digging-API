import { Profile } from "../profile.js";
import { Conservation } from "../conservation.js";

Profile.hasMany(Conservation, {
  foreignKey: "conservator_id",
});

Conservation.belongsTo(Profile, {
  foreignKey: "conservator_id",
});

export { Profile, Conservation };
