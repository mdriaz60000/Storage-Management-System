import express from "express";
import cookieParser from "cookie-parser";
import { GlobalError } from "./app/utils/global-error.js";
import { authRoutes } from "./app/module/auth/auth.route.js";
import { storageRoutes } from "./app/module/storage/storage.route.js";
import { noteRoutes } from "./app/module/note/note.route.js";
import { fileRoutes } from "./app/module/file/file.route.js";
import { folderRoutes } from "./app/module/folder/folder.route.js";


const app= express();

// parser middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

                                                   
app.use("/api/v1", authRoutes )
app.use("/api/v1", storageRoutes )
app.use("/api/v1", noteRoutes )
app.use("/api/v1", fileRoutes )
app.use("/api/v1", folderRoutes )


app.get("/", (req, res) => {
  res.send("Hello World! ");
});

app.use(GlobalError.handledError);
app.use(GlobalError.notFoundUrlError);

export default app; 