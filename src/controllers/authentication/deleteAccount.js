import { User } from "../../models/associations/user.profile.js";

/*----------------------------------------------------*/
// (SOFT) DELETE ACCOUNT
/*----------------------------------------------------*/
export const deleteAccount = async (req, res, next) => {
  try {
    const { uuid } = req.user;

    // UPDATE USER'S STATUS TO 3 (DEACTIVATED)
    await User?.update({ status: 3 }, { where: { uuid } });

    // @return response
    res.status(200).json({ message: "Account was deleted." });
  } catch (error) {
    next(error);
  }
};
