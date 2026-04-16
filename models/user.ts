import mongoose from "mongoose";

const user = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
  userName: { type: String },
  refreshToken: { type: String },
});

user.virtual("comments", {
  foreignField: "user",
  localField: "_id",
  ref: "comment",
});

user.virtual("orders", {
  foreignField: "user",
  localField: "_id",
  ref: "order",
});

const userModel = mongoose.models.user || mongoose.model("user", user);

export default userModel;
