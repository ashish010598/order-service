const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  products: [
    {
      productName: { type: String, required: true },
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      status: { type: String, default: "pending" }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: "pending" },
  orderId: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", OrderSchema);
