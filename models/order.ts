import mongoose, { Schema } from "mongoose";

const order = new Schema(
  {
    address: { type: String, required: true },
    phone: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true, default: 1 },
      },
    ],
    status: { type: String, default: "pending" },
  },
  { timestamps: true },
);

const orderModel = mongoose.models.order || mongoose.model("order", order);

export default orderModel;
