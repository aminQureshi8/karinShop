import mongoose from "mongoose";

const blog = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
      required: true,
    },

    author: { type: String, default: "نامشخص" },
    coverImage: { type: String, required: true },
    excerpt: { type: String },
    content: { type: String, required: true },
    tags: [String],
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const blogModel = mongoose.models.blog || mongoose.model("blog", blog);
export default blogModel;
