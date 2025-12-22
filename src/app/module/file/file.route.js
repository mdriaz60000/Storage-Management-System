
import express from "express";
import { fileController } from "./file.controller.js";
import { upload } from "../../utils/multer.js";

const router = express.Router();

 router.post("/file-upload",   upload.single('file'), fileController.createFile  );

export const fileRoutes = router