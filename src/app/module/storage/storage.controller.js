import { storageService } from "./storage.service.js";


const createStorage = async (req, res, next) => {
  try {
console.log(req.file)

    const result = await storageService.createStorage(req.body);

    res.status(201).json({
      success: true,
      message: "storage create successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const storageController = {
    createStorage
}