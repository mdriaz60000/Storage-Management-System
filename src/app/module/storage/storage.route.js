
import express from "express";
import { storageController } from "./storage.controller.js";


const router = express.Router();

 router.post("/create-storage", storageController.createStorage  );



export const storageRoutes = router