import mongoose from "mongoose";

const brand = new mongoose.Schema(
  {
    title: { type: String, required: true },
    imageUrl: { type: String},
  },
  { timestamps: true },
);

const brandModel = mongoose.models.brand || mongoose.model("brand", brand);

export default brandModel;
