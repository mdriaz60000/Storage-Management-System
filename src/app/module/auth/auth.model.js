import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config/index.js";

const authSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    confirmPassword: {
      type: String,
      required: true,
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
     storageUsed: {
    type: Number,
    default: 0, 
  },
   totalStorage: {
    type: Number,
    default: 15.00,
  },

    needsPasswordChange: {
      type: Boolean,
      default: false,
    },
    resetPasswordCode: {
   type: String,
   
 },

resetPasswordExpire: {
  type: Date,
},

    passwordChangedAt: Date,
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  // 1 password & confirmPassword match check
  if (this.password !== this.confirmPassword) {
    return next(new Error("Password and Confirm Password do not match"));
  }

  // 2 hash only if password modified
  if (!this.isModified("password")) return next();

  // 3 hash password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );

  // 4 remove confirmPassword before save
  this.confirmPassword = undefined;

  next();
});

// changePassword
authSchema.statics.isUserExists = async function (email) {
  return await this.findOne({ email }).select("+password");
};

authSchema.statics.isPasswordMatched = async function (
  plainPassword,
  hashedPassword
) {
  return await bcrypt.compare(plainPassword, hashedPassword);
};



export const authModel = model("auth", authSchema);
