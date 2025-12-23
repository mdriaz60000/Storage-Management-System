
import express from "express";
import { noteController } from "./note.controller.js";
import {auth} from "../../middleware/auth.js"

const router = express.Router();

 router.post("/create-note", auth(),  noteController.createNote  );
 router.get("/get-all-note", auth(), noteController.getAllNote  );
 router.put("/favorite-note/:id", auth(), noteController.favoriteNote  );
 router.put("/delete-note/:id", auth(), noteController.deleteNote  );



export const noteRoutes = router