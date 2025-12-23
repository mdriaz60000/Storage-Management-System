import { fileModel } from "./file.model.js";
const createFile = async (payload) => {
  const result = await fileModel.create(payload);
  return result ;
};

const getAllFile = async (userId) => {
  const result = await fileModel.find({ 
    user: userId,
    isDeleted:false
  });
  return result ;
};
const favoriteFile = async (id) => {
    console.log(id)
  const result = await fileModel.updateOne({
    _id: id, 
     isFavorite: true
 });
  return result ;
};
const deleteFile = async (id) => {
    console.log(id)
  const result = await fileModel.updateOne({
    _id: id, 
     isDeleted: true
 });
  return result ;
};

export const fileService = {
    createFile,
    getAllFile,
    favoriteFile,
    deleteFile
}