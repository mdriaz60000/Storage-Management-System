import { noteService } from "./note.service.js";

const createNote = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log(userId)
    const result = await noteService.createNote({ ...req.body, user:userId});
    res.status(201).json({
      success: true,
      message: "note create successfully",
      data : result
    });
  } catch (err) {
    next(err);
  }
};
const getAllNote = async (req, res, next) => {
  try {
    const result = await noteService.getAllNote();
    res.status(200).json({
      success: true,
      message: "get all note successfully",
      data : result

    });
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  try {
   const {id} = req.params
    const result = await noteService.deleteNote(id);
    res.status(200).json({
      success: true,
      message: "note delete successfully",
      data : result
    });
  } catch (err) {
    next(err);
  }
};

export const noteController = {
  createNote,
  getAllNote,
  deleteNote
}