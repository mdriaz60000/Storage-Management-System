
import express from "express";
import { folderController } from "./folder.controller.js";



const router = express.Router();

 router.post("/create-folder", folderController.createFolder  );
 router.get("/get-all-folder", folderController.getAllFolder  );
 router.put("/delete-folder/:id", folderController.deleteFolder  );

export const folderRoutes = router