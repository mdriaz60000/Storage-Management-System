import config from "../../config/index.js";
import { authService } from "./auth.service.js";
import jwt from "jsonwebtoken";

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);

    const { email, role, name } = result;
    const accessToken = jwt.sign({ email, role }, config.jwt_access_secret, {
      expiresIn: "2d",
    });
    const reFreshToken = jwt.sign({ email, role }, config.jwt_refresh_secret, {
      expiresIn: "30d",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
      path: "/",
    });

    res.cookie("reFreshToken", reFreshToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      data: {
        accessToken,
        user: {
          name,
          email,
          role,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    const { reFreshToken, accessUser, accessToken } = result;

    res.cookie("reFreshToken", reFreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
    });
    res.cookie("accessToken", accessToken, {
      secure: config.node_env === "production",
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        reFreshToken,
        accessUser,
      },
    });
  } catch (err) {
    next(err);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const result = await authService.forgetPassword(req.body);

    res.status(200).json({
      success: true,
      message: "Password reset link sent",
    });
  } catch (err) {
    next(err);
  }
};

const verifyResetCode = async (req, res, next) => {
  try {
    const { resetToken } = await authService.verifyResetCode(req.body);

    res.cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Reset code verified successfully",
    });
  } catch (err) {
    next(err);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const token = req.cookies.resetToken;
    const { password, confirmPassword } = req.body;

    await authService.resetPassword({
      password,
      confirmPassword,
      token,
    });

    res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (err) {
    next(err);
  }
};

export const authController = {
  register,
  login,
  forgetPassword,
  verifyResetCode,
  resetPassword,
};
