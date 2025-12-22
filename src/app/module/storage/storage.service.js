import { storageModel } from "./storage.model.js";


const createStorage = async (payload) => {
  console.log(payload);
  const result = await storageModel.create(payload);
  return result ;
};


export const storageService = {
    createStorage,
}