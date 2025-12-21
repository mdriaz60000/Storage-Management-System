import { authModel } from "./auth.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config/index.js";
import { sendEmail } from "../../utils/sendEmail.js";
const register = async (payload) => {
  console.log(payload);
  const result = await authModel.create(payload);
  const user = result.toObject();
  user.password;
  return user;
};

const login = async (payload) => {
  const user = await authModel
    .findOne({ email: payload?.email })
    .select("+password");

  if (!user) {
    throw new Error("this is user error");
  }
  const isPasswordMatch = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatch) {
    throw new Error("password is wrong");
  }

  const accessToken = jwt.sign(
    { email: user?.email, role: user?.role },
    config.jwt_access_secret,
    { expiresIn: "2d" }
  );

  const reFreshToken = jwt.sign(
    { email: user?.email, role: user?.role },
    config.jwt_refresh_secret,
    { expiresIn: "30d" }
  );

  const accessUser = { name: user?.name, email: user?.email, role: user?.role };
  return { accessUser, accessToken, reFreshToken };
};

const forgetPassword = async (payload) => {
  const { email } = payload;

  const user = await authModel.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  // 6 digit code
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

  user.resetPasswordCode = resetCode;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  await user.save({ validateBeforeSave: false });

  await sendEmail({
    to: user.email,
    subject: "Password Reset Code",
    html: `
      <h2>Password Reset</h2>
      <p>Your verification code is:</p>
      <h1>${resetCode}</h1>
      <p>This code will expire in 10 minutes.</p>
    `,
  });

  return true;
};

const verifyResetCode = async ({ email, resetPasswordCode }) => {
  const user = await authModel.findOne({
    email,
    resetPasswordCode,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("Invalid or expired code");
  }

  const resetToken = jwt.sign({ userId: user._id }, config.jwt_refresh_secret, {
    expiresIn: "50m",
  });

  return { resetToken };
};

const resetPassword = async ({ password, confirmPassword, token }) => {
  if (!token) {
    throw new Error("Reset token missing");
  }

  const decoded = jwt.verify(token, config.jwt_refresh_secret);

  const user = await authModel.findById(decoded.userId);
  if (!user) throw new Error("User not found");

  user.password = password;
  user.confirmPassword = confirmPassword;

  user.passwordChangedAt = new Date();
  user.resetPasswordCode = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  return true;
};

export const authService = {
  register,
  login,
  forgetPassword,
  verifyResetCode,
  resetPassword,
};
