import mongoose from "mongoose";

const brand = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const brandModel = mongoose.models.brand || mongoose.model("brand", brand);

export default brandModel;
