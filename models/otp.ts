import mongoose from "mongoose";

const otp = new mongoose.Schema({
  code: { type: Number, required: true },
  identifier: {
    type: String,
    required: true,
  },
  expTime: {
    type: Date,
    required: true,
    expires: 0, 
  },
});

const otpModel = mongoose.models.otp || mongoose.model("otp", otp);

export default otpModel;
