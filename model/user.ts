import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
  },
  { timestamps: true },
);

const userModel = mongoose.models.user || mongoose.model("user", user);

export default userModel;
