import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, enum: ["ADMIN", "USER"], default: "USER" },
    dateTime: { type: Date, require: true },
    refreshToken: { type: String },
  },
  {
    timestamps: true,
  },
);

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
