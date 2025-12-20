import config from "../../config/index.js";
import { authService } from "./auth.service.js";
import jwt from "jsonwebtoken"

const register = async (req, res, next) => {
try {
    const result = await authService.register(req.body);

    const { email, role, name } = result;
    const accessToken = jwt.sign(
      { email, role },
      config.jwt_access_secret ,
      { expiresIn: "2d" }
    );
    const reFreshToken = jwt.sign(
      { email, role },
      config.jwt_refresh_secret,
      { expiresIn: "30d" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000, // 15 মিনিট বা তোমার পছন্দমত সময়
      path: "/",
    });

    res.cookie("reFreshToken", reFreshToken, {
      httpOnly: true,
      secure: config.node_env === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 দিন
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
    const { reFreshToken, accessUser, accessToken} = result

     res.cookie("reFreshToken", reFreshToken, {
      secure: config.node_env === "production",
      httpOnly: true,
     })
     res.cookie("accessToken", accessToken, {
      secure: config.node_env === "production",
      httpOnly: true,
     })

    res.status(200).json( {
     
      success: true,
      message: "Login successful",
      data: {
        accessToken,
        reFreshToken,
        accessUser,
      }
    });
  } catch (err) {
    next(err);
  }
};


export const authController ={
register,
login
}