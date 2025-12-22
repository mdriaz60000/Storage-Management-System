
import express from "express";
import { noteController } from "./note.controller.js";


const router = express.Router();

 router.post("/create-note", noteController.createNote  );
 router.get("/get-all-note", noteController.getAllNote  );
 router.put("/delete-note/:id", noteController.deleteNote  );



export const noteRoutes = router