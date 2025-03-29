const Order = require("../models/Order");

// Create a new order
const createOrder = async (userId, products) => {
  const totalAmount = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );
  const order = new Order({ userId, products, totalAmount });
  return await order.save();
};

// Get all orders for a user
const getUserOrders = async (userId) => {
  return await Order.find({ userId });
};

// Update order details
const updateOrder = async (orderId, productId, status) => {
  let order = await Order.findOne({ orderId });

  if (!order) throw new Error("Order not found");
  if (productId) {
    order.products.forEach((p) => {
      if (p.productId === productId) p.status = status;
    });
  } else {
    order.status = status;
    order.products.forEach((p) => (p.status = status));
  }
  return await order.save();
};

module.exports = { createOrder, getUserOrders, updateOrder };
