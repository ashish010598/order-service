const Order = require("../models/Order");
const {
  ALLOWED_ORDER_STATUSES,
  PRIVILEGED_ORDER_STATUSES,
} = require("../constants");

// Create a new order
const createOrder = async (userId, products) => {
  try {
    for (const product of products) {
      const response = await axios.get(
        `http://product-service/api/products/${product.productId}`
      );
      const availableQuantity = response.data.quantity;

      if (product.quantity > availableQuantity) {
        throw new Error(
          `Quantity not available for product: ${product.productName}`
        );
      }
    }
    const totalAmount = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0
    );
    const order = new Order({ userId, products, totalAmount });
    return await order.save();
  } catch (error) {
    throw new Error(error.message || "Error creating order");
  }
};

// Get all orders for a user
const getUserOrders = async (userId) => {
  return await Order.find({ userId });
};

// Update order details
const updateOrder = async (orderId, productId, status) => {
  let order = await Order.findOne({ orderId });

  if (!ALLOWED_ORDER_STATUSES.includes(status)) {
    throw new Error(`Invalid status: ${status}.`);
  }

  if (!order) throw new Error("Order not found");
  if (productId) {
    order.products.forEach((p) => {
      if (p.productId === productId) {
        if (!EXCLUDED_STATUSES.includes(p.status)) {
          p.status = status;
        }
      }
    });
  } else {
    order.status = status;
    order.products.forEach((p) => {
      if (!EXCLUDED_STATUSES.includes(p.status)) {
        p.status = status;
      }
    });
  }
  return await order.save();
};

// Update order status with privileged status
const handlePrivilegedOrderStatus = async (orderId, productId, status) => {
  let order = await Order.findOne({ orderId });

  if (!PRIVILEGED_ORDER_STATUSES.includes(status)) {
    throw new Error(`Invalid status: ${status}.`);
  }

  if (!order) throw new Error("Order not found");
  if (productId) {
    let productFound = false;

    for (const product of order.products) {
      if (product.productId === productId) {
        if (
          (status === "cancelled" && product.status === "returning") ||
          (status === "returning" && product.status === "cancelled")
        ) {
          throw new Error(
            `Cannot update product with ID ${productId} to ${status} as it is in a conflicting state (${product.status}).`
          );
        }
        await axios.post(
          `http://product-service/api/products/${product.productId}/restock`,
          { quantity: product.quantity }
        );
        product.status = status;
        productFound = true;
        break;
      }
    }
    if (!productFound) {
      throw new Error("Product not found in the order");
    }
  } else {
    for (const product of order.products) {
      if (
        (status === "cancelled" && product.status === "returning") ||
        (status === "returning" && product.status === "cancelled")
      ) {
        continue;
      }
      await axios.post(
        `http://product-service/api/products/${product.productId}/restock`,
        { quantity: product.quantity }
      );
      product.status = status;
    }
    order.status = status;
  }
  return await order.save();
};

module.exports = {
  createOrder,
  getUserOrders,
  updateOrder,
  handlePrivilegedOrderStatus,
};
