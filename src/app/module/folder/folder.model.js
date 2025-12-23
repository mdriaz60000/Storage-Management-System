
import { Schema, model } from "mongoose";

const folderSchema = new Schema(
  {
    userId: {
         type: Schema.Types.ObjectId,
          ref: "auth",
        //    required: true
         },
    name: {
         type: String,
         default: "New Folder",
         },
    isFavorite: {
         type: Boolean,
          default: false 
        },
    isDelete: {
         type: Boolean,
          default: false 
        },
  },
  { timestamps: true }
);

export const folderModel = model("folder", folderSchema);
