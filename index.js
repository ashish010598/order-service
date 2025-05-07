require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { connectProducer } = require("./config/kafka");
const { startUserEventConsumer } = require("./services/kafkaConsumer");

const app = express();
app.use(express.json());

connectDB(); // Connect to MongoDB
connectProducer().catch((err) => {
  console.error("Failed to connect Kafka producer:", err);
});
startUserEventConsumer();

const orderRoutes = require("./routes/orderRoutes");
app.use("/orders", orderRoutes);

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
