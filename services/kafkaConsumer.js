const { consumer } = require("../config/kafka");

const startUserEventConsumer = async () => {
  try {
    // Subscribe to the topic
    await consumer.subscribe({ topic: "users", fromBeginning: true });

    console.log("Kafka Consumer for User Events started...");

    // Run the consumer to process messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const event = JSON.parse(message.value.toString());
        console.log(`Received event from topic ${topic}:`, event);

        // Handle the event based on its type
        switch (event.eventType) {
          case "USER_CREATED":
            console.log("Handling USER_CREATED event:", event.data);
            // Add your logic to handle USER_CREATED events
            break;

          case "USER_UPDATED":
            console.log("Handling USER_UPDATED event:", event.data);
            // Add your logic to handle USER_UPDATED events
            break;

          default:
            console.warn("Unknown event type:", event.eventType);
        }
      },
    });
  } catch (err) {
    console.error("Failed to start Kafka consumer:", err);
  }
};

module.exports = { startUserEventConsumer };
