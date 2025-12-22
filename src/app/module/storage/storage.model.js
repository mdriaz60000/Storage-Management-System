
import { model, Schema } from "mongoose";
// import { authModel } from "../auth/auth.model";

const storageSchema = new Schema(
  {
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: authModel,
    //   required: true,
    //   unique: true,
    // },


    usage: {
      totalUsed: { type: Number, default: 0 },
      notesUsed: { type: Number, default: 0 },
      pdfsUsed: { type: Number, default: 0 },
      imagesUsed: { type: Number, default: 0 },
    },

    notes: [
      {
        content: String,
        size: Number, // MB
        createdAt: { type: Date, default: Date.now },
      },
    ],

    pdfs: [
      {
        filename: String,
        fileUrl: String,
        size: Number, // MB
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    images: [
      {
        name: String,
        url: String,
        size: Number, // MB
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const storageModel = model("Storage", storageSchema);
