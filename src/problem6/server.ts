import { AppDataSource } from "./config/db";
import { keys } from "./config/const";
import app from "./app";
import http from "http";
import { initSocket } from "./socket";

const bootstrap = async () => {
  try {
    console.log(`Environment: ${keys.NODE_ENV}`);
    await AppDataSource.initialize();

    const server = http.createServer(app);

    // Initialize Socket.IO in a separate module
    initSocket(server);

    server.listen(keys.PORT, () => {
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
