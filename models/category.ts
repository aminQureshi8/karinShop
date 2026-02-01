import mongoose from "mongoose";

const category = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String },
});

const categoryModel =
  mongoose.models.category || mongoose.model("category", category);

export default categoryModel;
