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

    // CLEAN UP DATA BEFORE SEND A RESPONSE
    delete user?.dataValues?.id;
    delete user?.dataValues?.password;
    delete user?.dataValues?.otp;
    delete user?.dataValues?.otp_exp;
    delete profile?.dataValues?.id;
    delete profile?.dataValues?.user_id;

    // SEND RESPONSE
    res.status(200).json({ user, profile });
  } catch (error) {
    next(error);
  }
};
