
import express from "express";
import { fileController } from "./file.controller.js";
import { upload } from "../../utils/multer.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

 router.post("/file-upload", auth() ,  upload.single('file'), fileController.createFile  );
 router.get("/get-all-file", auth(), fileController.getAllFile  );
 router.put("/favorite-file/:id", auth(), fileController.favoriteFile  );
 router.put("/delete-file/:id", auth(), fileController.deleteFile);

export const fileRoutes = router