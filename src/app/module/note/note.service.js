import { noteModel } from "./note.model.js";

const createNote = async (payload) => {
  console.log(payload);
  const result = await noteModel.create(payload );
  return result ;
};
const getAllNote = async (userId) => {
  const result = await noteModel.find({ 
    user: userId,
    isDeleted:false
  });
  return result ;
};
const favoriteNote = async (id) => {
    console.log(id)
  const result = await noteModel.updateOne({
    _id: id, 
     isFavorite: true
 });
  return result ;
};
const deleteNote = async (id) => {
    console.log(id)
  const result = await noteModel.updateOne({
    _id: id, 
     isDeleted: true
 });
  return result ;
};

export const noteService = {
    createNote,
    getAllNote,
    favoriteNote,
    deleteNote

}