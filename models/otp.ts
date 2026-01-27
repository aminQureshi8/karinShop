import mongoose from "mongoose";

const otp = new mongoose.Schema({
  code: { type: Number, required: true },
  expTime: {
    type: Number,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otp);

export default otpModel;
