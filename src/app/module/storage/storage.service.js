import { fileModel } from "../file/file.model.js";
import { folderModel } from "../folder/folder.model.js";
import { noteModel } from "../note/note.model.js";


const getAllData = async (userId) => {
  // Folder
  const folders = await folderModel.find({
    userId,
    isDelete: false,
  });

  // Note
  const notes = await noteModel.find({
    user: userId,
    isDeleted: false,
  });

  // File
  const files = await fileModel.find({
    auth: userId,
    isDelete: false,
  });

  // Merge full data
  const allData = [
    ...folders.map(item => ({
      ...item.toObject(),
      dataType: "folder",
    })),
    ...notes.map(item => ({
      ...item.toObject(),
      dataType: "note",
    })),
    ...files.map(item => ({
      ...item.toObject(),
      dataType: "file",
    })),
  ];

  // Sort by time
  allData.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return allData;
};

export const allDataService = {
  getAllData
};
