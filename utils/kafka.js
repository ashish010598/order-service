const { Kafka } = require("kafkajs");

const { KAFKA_CLIENT_ID, KAFKA_BROKERS, KAFKA_GROUP_ID } = process.env;
const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKERS], // Replace with your Kafka broker addresses
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: KAFKA_GROUP_ID });

const connectKafka = async () => {
  try {
    await producer.connect();
    await consumer.connect();
    console.log("✅ Order Service Kafka connected successfully");
  } catch (error) {
    console.error("❌ Order Service Kafka connection failed:", error);
  }
};

module.exports = { producer, consumer, connectKafka };
