const mongoose = require("mongoose");
const md5 = require("md5");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
    amount: { type: String, required: false },
    status: {
      type: String,
      required: true,
      enum: ["PLACED", "APPROVED", "DELIVERED", "CANCELLED"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
