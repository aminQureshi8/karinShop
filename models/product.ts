import mongoose from "mongoose";

const product = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subCategory",
    required: true,
  },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: "brand", required: true },
  colors: [{ type: String }],
  tags: {
    type: [String],
    default: [],
  },
  features: [
    {
      name: String,
      value: String,
    },
  ],
  imageUrls: [{ type: String }],
  mainImage: {
    type: String,
    required: true,
  },
  description: { type: String, required: true },
  count: {
    type: Number,
    default: 0,
  },
  inUserBasket: {
    type: Number,
    default: 0,
  },
  isStock: {
    type: Boolean,
    default: false,
  },
  campaion: {
    type: Number,
    default: 0,
  },
  off: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "off",
  },
  sale: {
    type: Number,
    default: 0,
  },
});

product.virtual("comments", {
  foreignField: "product",
  localField: "_id",
  ref: "comment",
});

const productModel =
  mongoose.models.product || mongoose.model("product", product);

export default productModel;
