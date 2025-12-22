
import { Schema, model } from "mongoose";

const fileSchema = new Schema(
  {
    auth: { 
        type: Schema.Types.ObjectId,
         ref: "auth" 
        },

    type: {
      type: String,
      enum: ["image", "pdf"],
      required: true,
    },

    name: String,
    fileUrl: String,
    size: Number, // MB
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

export const fileModel = model("file", fileSchema);
