
import { folderModel } from "./folder.model.js";
const createFolder = async (payload) => {

  const result = await folderModel.create(payload);
  return result ;
};
const getAllFolder = async () => {

  const result = await folderModel.find();
  return result ;
};

const deleteFolder = async (id) => {
    
  const result = await folderModel.updateOne({
    _id: id, 
     isDeleted: true
 });
  return result ;
};

export const folderService = {
    createFolder,
    getAllFolder,
    deleteFolder
}