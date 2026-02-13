import mongoose from "mongoose";

const subCategory = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const subCategoryModel =
  mongoose.models.subCategory || mongoose.model("subCategory", subCategory);

export default subCategoryModel;
