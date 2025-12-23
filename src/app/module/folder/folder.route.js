
import express from "express";
import { folderController } from "./folder.controller.js";
import {auth} from "../../middleware/auth.js"


const router = express.Router();

 router.post("/create-folder", auth(), folderController.createFolder  );
 router.get("/get-all-folder", auth(), folderController.getAllFolder  );
 router.put("/delete-folder/:id", auth(), folderController.deleteFolder  );

export const folderRoutes = router