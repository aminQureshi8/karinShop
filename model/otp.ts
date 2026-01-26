import mongoose from "mongoose";

const otp = new mongoose.Schema({
  phoneOrEmail: { type: String, required: true },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otp);

export default otpModel;
