import express from "express";
import { authController } from "./auth.controller.js";

const router = express.Router();

 router.post("/register", authController.register );
 router.post("/login", authController.login );
 router.post("/forget-password", authController.forgetPassword );
 router.post("/verify-reset-code", authController.verifyResetCode );
 router.post("/reset-password", authController.resetPassword );


export const authRoutes = router