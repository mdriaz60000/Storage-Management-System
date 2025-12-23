import { Schema, model } from "mongoose";

const noteSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "auth",
       required: true,
    },

    content: {
      type: String,
      required: true,
    },

    size: {
      type: Number,
      default: 0,
    }, // MB
    isFavorite: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const noteModel = model("note", noteSchema);
