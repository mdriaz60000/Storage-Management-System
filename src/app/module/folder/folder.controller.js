

import { folderService } from "./folder.service.js";

const createFolder = async (req, res, next) => {
  try {

    const payload = req.body;
    const result = await folderService.createFolder(payload);

    res.status(201).json({
      success: true,
      message: "folder created successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
const getAllFolder = async (req, res, next) => {
  try {

    const result = await folderService.getAllFolder();

    res.status(200).json({
      success: true,
      message: "Folder get successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};


const deleteFolder = async (req, res, next) => {
  try {
   const {id} = req.params
    const result = await folderService.deleteFolder(id);
    res.status(200).json({
      success: true,
      message: "folder delete successfully",
      data : result
    });
  } catch (err) {
    next(err);
  }
};

export const folderController = {
  createFolder,
  getAllFolder,
  deleteFolder
};
