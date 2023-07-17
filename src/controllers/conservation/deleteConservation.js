import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import { Conservation } from "../../models/conservation.js";
import db from "../../database/index.js";

/*----------------------------------------------------*/
// DELETE CONSERVATION
/*----------------------------------------------------*/
export const deleteConservation = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { article_id } = req.body;

    // CHECK IF USER EXISTS
    const user = await User?.findOne({ where: { uuid } });

    if (!user || user?.dataValues?.status === 3)
      throw {
        status: errorStatus.BAD_REQUEST_STATUS,
        message: errorMessage.USER_DOES_NOT_EXISTS,
      };

    // GET DATA FROM PROFILE
    const profile = await Profile?.findOne({
      where: { user_id: user?.dataValues?.id },
    });

    // GET CONSERVATOR'S ID
    const conservator_id = profile?.dataValues?.id;

    // DELETE CONSERVATION DATA FROM DB
    await Conservation.destroy({
      where: {
        conservator_id,
        article_id,
      },
    });

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(200).json({
      message: "Conservation was deleted successfully.",
    });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};
