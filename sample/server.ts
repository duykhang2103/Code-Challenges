import app from "./app";
import connectToDB from "./config/db";
import { keys } from "./config/const";
import { kafkaConsumer, kafkaProducer } from "./config/queue";

const bootstrap = async () => {
  try {
    await connectToDB();
    await kafkaConsumer.start();
    await kafkaProducer.connect();
    app.listen(keys.PORT, () => {
      console.log(`Server is running on port ${keys.PORT}`);
      console.log(`Environment: ${keys.NODE_ENV}`);
    });
    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down gracefully...");
      await kafkaConsumer.shutdown();
      await kafkaProducer.disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during bootstrap:", error);
    process.exit(1);
  }
};

bootstrap();
