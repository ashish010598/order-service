const OrderService = require("../services/orderService");

// Create an order
exports.createOrder = async (req, res) => {
  try {
    const { products,userId } = req.body;
    const order = await OrderService.createOrder(userId, products);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: "Error creating order", error });
  }
};

// Get user orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await OrderService.getUserOrders(req.query.userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: "Error fetching orders", error });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
    try {
        const { orderId, productId, status } = req.body;
        let order;
        if (productId) {
            order = await OrderService.updateOrder(orderId, productId, status);
        } else {
            order = await OrderService.updateOrder(orderId, status);
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
