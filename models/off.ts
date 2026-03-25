import mongoose from "mongoose";

const off = new mongoose.Schema(
  {
    code: { type: String, required: true },
    products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
    percent: { type: Number, required: true },
  },
  { timestamps: true },
);

const offModel = mongoose.models.off || mongoose.model("off", off);

export default offModel;
