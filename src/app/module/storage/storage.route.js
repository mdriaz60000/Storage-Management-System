
import express from "express";

import { auth } from '../../middleware/auth.js';
import { allDataController } from "./storage.controller.js";


const router = express.Router();

router.get("/all-storage", auth(), allDataController.getAllData);



export const storageRoutes = router