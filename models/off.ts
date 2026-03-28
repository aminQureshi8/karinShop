import mongoose from "mongoose";

const off = new mongoose.Schema(
  {
    dateTime: { type: Date, required: true },
    percent: { type: Number, required: true },
  },
  { timestamps: true },
);

const offModel = mongoose.models.off || mongoose.model("off", off);

export default offModel;
