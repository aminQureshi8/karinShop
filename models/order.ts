import mongoose, { Schema } from "mongoose";

const order = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  products: [{ type: Schema.Types.ObjectId, ref: "product", required: true }],
});

const orderModel = mongoose.models.order || mongoose.model("order", order);

export default orderModel;
