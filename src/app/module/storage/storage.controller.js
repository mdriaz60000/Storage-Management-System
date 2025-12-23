import { allDataService } from "./storage.service.js";

const getAllData = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(userId)
    const result = await allDataService.getAllData(userId);

    res.status(200).json({
      success: true,
      message: "All data fetched successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const allDataController = {
  getAllData
};
