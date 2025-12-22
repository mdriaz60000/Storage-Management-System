// file.controller.js
import { fileService } from "./file.service.js";

const createFile = async (req, res, next) => {
  try {
    const uploadedFile = req.file;

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "File is required",
      });
    }

    const payload = {
      
      type: uploadedFile.mimetype.startsWith("image/")
        ? "image"
        : "pdf",
      name: uploadedFile.originalname,
      fileUrl: `/uploads/${uploadedFile.filename}`,
      size: uploadedFile.size / 1024 / 1024, // MB
    };

    const result = await fileService.createFile(payload);

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const fileController = {
  createFile,
};
