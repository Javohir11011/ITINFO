import {
  statusCodes,
  errorMessages,
  ApiError,
  logger,
} from "../utils/index.js";
import {
  createAdmin,
  deleteAdmin,
  login,
  refresh,
  register,
  restorePassword,
  updateAdmin,
  verification,
} from "../service/index.js";

export const registerController = async (req, res, next) => {
  try {
    logger.info("Route: /auth/register METHOD: POST");
    const { email, role } = req.body;
    const currentUser = await register(email, role, req.body);
    return res.status(statusCodes.CREATED).send(currentUser);
  } catch (error) {
    logger.error(`Route: /auth/register METHOD: POST, ${error.message}`);

    next(new ApiError(error.statusCode, error.message));
  }
};
export const loginController = async (req, res, next) => {
  try {
    logger.info("Route: /auth/login METHOD: POST");

    const { email, password } = req.body;

    const currentUser = await login(email, password);
    return res.send({
      accessToken: currentUser.access,
      refreshToken: currentUser.refresh,
    });
  } catch (error) {
    logger.error(`Route: /auth/login METHOD: POST, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};
export const refreshTokenController = async (req, res, next) => {
  try {
    logger.info("Route: /auth/refreshToken METHOD: POST");
    const { token } = req.body;
    const refreshedTokens = await refresh(token);
    return res.send({
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken,
    });
  } catch (error) {
    logger.error(`Route: /auth/refreshToken METHOD: POST, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const adminController = async (req, res, next) => {
  try {
    logger.info("Route: /auth/admin METHOD: POST");

    const { email } = req.body;
    const result = await createAdmin(email, req.body);
    return res.status(statusCodes.CREATED).send(result);
  } catch (error) {
    logger.error(`Route: /auth/login METHOD: POST, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};
export const updateAdminController = async (req, res, next) => {
  try {
    logger.info("Route: /auth/admin/:email METHOD: PUT");

    const email = req.params.email;
    let { password, newpassword, name, role } = req.body;
    const user = await updateAdmin(email, password, newpassword, name, role);
    res.status(statusCodes.OK).send(user);
  } catch (error) {
    logger.info("Route: /auth/admin/:email METHOD: PUT");

    next(new ApiError(error.statusCode || 500, error.message));
  }
};
export const deleteAdminController = async (req, res, next) => {
  try {
    logger.info("Route: /auth/admin/:email METHOD: DELETE");

    const email = req.params.email;
    const users = await deleteAdmin(email);
    res.status(statusCodes.OK).send(users);
  } catch (error) {
    logger.error(`Route: /auth/admin/:email METHOD: DELETE, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const verifyController = async (req, res, next) => {
  try {
    logger.info(`Route: /auth/verify METHOD: POST`);

    const { otp, email } = req.body;
    const verifyAcc = await verification(email, otp);
    res.status(statusCodes.OK).send(verifyAcc);
  } catch (error) {
    logger.error(`Route: /auth/verify METHOD: POST, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};
export const forgetPasswordController = async (req, res, next) => {
  try {
    logger.info(`Route: /auth/restore-password METHOD: PUT`);
    const { email, newpassword, otp } = req.body;
    const currentUser = await restorePassword(email, newpassword, otp);
    res.status(statusCodes.OK).send(currentUser);
  } catch (error) {
    logger.error(`Route: /auth/restore-passwor METHOD: PUT, ${error.message}`);
    next(new ApiError(error.statusCode, error.message));
  }
};
