import express from "express";
import { authController } from "./auth.controller.js";
import {auth} from "../../middleware/auth.js"

const router = express.Router();

 router.post("/register", authController.register );
 router.post("/login", authController.login );
 router.post("/forget-password", authController.forgetPassword );
 router.post("/verify-reset-code", authController.verifyResetCode );
 router.post("/reset-password", authController.resetPassword );
 router.put("/delete-account", auth(), authController.deleteAccount );


export const authRoutes = router