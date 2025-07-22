import { Server as SocketIOServer } from "socket.io";
import { AppDataSource } from "./config/db";

let io: SocketIOServer | null = null;

export function initSocket(server: any) {
  io = new SocketIOServer(server, { cors: { origin: "*" } });

  io.on("connection", async (socket) => {
    console.log("New client connected");

    // Emit the leaderboard to the newly connected client
    const leaderboard = await AppDataSource.getRepository("User")
      .createQueryBuilder("user")
      .select(["user.id", "user.username", "user.score"])
      .orderBy("user.score", "DESC")
      .addOrderBy("user.id", "ASC")
      .limit(10)
      .getMany();

    socket.emit("leaderboard", leaderboard);

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
}

export function getIO(): SocketIOServer | null {
  return io;
}
