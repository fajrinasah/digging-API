import { User, Profile } from "../../models/associations/user.profile.js";

/*----------------------------------------------------*/
// KEEP LOGIN
/*----------------------------------------------------*/
export const keepLogin = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    // GET USER'S DATA AND PROFILE
    const user = await User?.findOne({ where: { uuid } });
    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    // COMPILE PUBLIC USER'S DATA AND PROFILE
    const userData = {
      email: user?.dataValues?.email,
      phone_number: user?.dataValues?.phone_number,
      username: user?.dataValues?.username,
      display_name: profile?.dataValues?.display_name,
      photo_profile: profile?.dataValues?.photo_profile,
      about: profile?.dataValues?.about,
      role_id: user?.dataValues?.role_id,
      status_id: user?.dataValues?.status_id,
    };

    // SEND RESPONSE
    res.status(200).json({ userData });
  } catch (error) {
    next(error);
  }
};
