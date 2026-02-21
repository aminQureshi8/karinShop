import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: { type: String, required: true },
  subCategory: { type: String, required: true },
  brand: { type: String, required: true },
  colors: [{ type: String }],
  tags: [{ type: String }],
  features: [
    {
      name: String,
      value: String,
    },
  ],
  imageUrls: [{ type: String }],
  description: { type: String, required: true },
});

product.virtual("comments", {
  foreignField: "product",
  localField: "_id",
  ref: "comment",
});

const productModel =
  mongoose.models.product || mongoose.model("product", product);

export default productModel;
