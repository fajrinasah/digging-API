import * as errorStatus from "../../middlewares/globalErrorHandler/errorStatus.js";
import { User, Profile } from "../../models/associations/user.profile.js";
import { Conservation } from "../../models/conservation.js";
import db from "../../database/index.js";

/*----------------------------------------------------*/
// POST CONSERVATION
/*----------------------------------------------------*/
export const postConservation = async (req, res, next) => {
  // START TRANSACTION
  const transaction = await db.sequelize.transaction();

  try {
    const { uuid } = req.user;
    const { article_id } = req.params;

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

    // INSERT CONSERVATION DATA INTO DB
    const conservation = await Conservation?.create({
      conservator_id,
      article_id,
    });

    // COMMIT TRANSACTION
    await transaction.commit();

    // SEND RESPONSE
    res.status(201).json({
      message: "Article was conserved successfully.",
      conservation,
    });
  } catch (error) {
    // ROLLBACK TRANSACTION IF THERE'S ANY ERROR
    await transaction.rollback();

    next(error);
  }
};
