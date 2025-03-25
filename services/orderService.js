const Order = require("../models/Order");

// Create a new order
const createOrder = async (userId, products) => {
  const totalAmount = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const order = new Order({ userId, products, totalAmount });
  return await order.save();
};

// Get all orders for a user
const getUserOrders = async (userId) => {
  return await Order.find({ userId });
};

// Update order details
const updateOrder = async (req, res) => {
    try {
      const { orderId, productId, status } = req.body;
      let order = await Order.findById(orderId);
  
      if (!order) return res.status(404).json({ error: 'Order not found' });
  
      if (productId) {
        order.products.forEach((p) => {
          if (p.productId === productId) p.status = status;
        });
      } else {
        order.status = status;
        order.products.forEach((p) => (p.status = status));
      } 
      await order.save();
      res.json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

module.exports = { createOrder, getUserOrders, updateOrder};
