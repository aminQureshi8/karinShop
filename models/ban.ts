import mongoose from "mongoose";

const ban = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    bannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    bannedAt: { type: Date, default: Date.now, required: true },
    banReason: { type: String, default: "" },
    durationUntil: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

const banModel = mongoose.models.ban || mongoose.model("ban", ban);

export default banModel;
