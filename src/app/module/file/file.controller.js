
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

const getAllFile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const result = await fileService.getAllFile(userId);
    res.status(200).json({
      success: true,
      message: "get all file successfully",
      data : result

    });
  } catch (err) {
    next(err);
  }
};

const favoriteFile = async (req, res, next) => {
  try {
   const {id} = req.params
    const result = await fileService(id);
    res.status(200).json({
      success: true,
      message: "file favorite successfully",
      data : result
    });
  } catch (err) {
    next(err);
  }
};
const deleteFile = async (req, res, next) => {
  try {
   const {id} = req.params
    const result = await fileService.deleteFile(id);
    res.status(200).json({
      success: true,
      message: "file delete successfully",
      data : result
    });
  } catch (err) {
    next(err);
  }
};

export const fileController = {
  createFile,
  getAllFile,
  favoriteFile,
  deleteFile
};
