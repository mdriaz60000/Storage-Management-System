import { fileModel } from "./file.model.js";
const createFile = async (payload) => {
  const result = await fileModel.create(payload);
  return result ;
};

export const fileService = {
    createFile,
}