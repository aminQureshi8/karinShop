import mongoose from "mongoose";

const comment = new mongoose.Schema(
  {
    title: { type: String, required: true },
    user: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "product",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isOk: {
      type: Boolean,
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    dislikesCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const commentModel =
  mongoose.models.comment || mongoose.model("comment", comment);

export default commentModel;
