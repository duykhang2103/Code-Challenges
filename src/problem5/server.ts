import app from "./app";
import connectToDB from "./config/db";
import { keys } from "./config/const";

const bootstrap = async () => {
  try {
    console.log(`Environment: ${keys.NODE_ENV}`);
    await connectToDB();
    app.listen(keys.PORT, () => {
      console.log(`Server is running on port ${keys.PORT}`);
    });
    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down gracefully...");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error during bootstrap:", error);
    process.exit(1);
  }
};

bootstrap();
