import mongoose from "mongoose";

const off = new mongoose.Schema({
  type: { type: String, enum: ["all", "many"], required: true },
  percent: Number,
  products: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      percent: Number,
    },
  ],
  dateTime: { type: Date, require: true },
});

off.index({ dateTime: 1 }, { expireAfterSeconds: 0 });

const offModel = mongoose.models.off || mongoose.model("off", off);

export default offModel;
