import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import jwt from "jsonwebtoken";
import cors from "cors";
import bodyParser from "body-parser";
import {
  DataSource,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
} from "typeorm";

// --- TypeORM Entity ---
@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ default: 0 })
  score!: number;
}

// --- TypeORM DataSource ---
const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "your_mysql_password",
  database: "scoreboard",
  synchronize: true,
  logging: false,
  entities: [User],
});

// --- JWT Secret ---
const JWT_SECRET = "REPLACE_ME_WITH_A_SECURE_SECRET";

// --- Express & Socket.io Setup ---
const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, { cors: { origin: "*" } });

app.use(cors());
app.use(bodyParser.json());

// --- Authentication Middleware ---
interface AuthRequest extends Request {
  user?: { userId: number; username: string };
}
function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }
  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET) as {
      userId: number;
      username: string;
    };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// --- Helper: Get Top 10 Leaderboard ---
async function getLeaderboard() {
  return await User.createQueryBuilder("user")
    .select(["user.id", "user.username", "user.score"])
    .orderBy("user.score", "DESC")
    .addOrderBy("user.id", "ASC")
    .limit(10)
    .getMany();
}

// --- API: Get Leaderboard ---
app.get(
  "/api/leaderboard",
  authenticate,
  async (req: AuthRequest, res: Response) => {
    const leaderboard = await getLeaderboard();
    res.json({ leaderboard });
  }
);

// --- API: Update Score ---
app.post(
  "/api/score",
  authenticate,
  async (req: AuthRequest, res: Response) => {
    const userId = req.user!.userId;
    const user = await User.findOneBy({ id: userId });
    if (!user) return res.status(404).json({ error: "User not found" });
    user.score += 1;
    await user.save();
    const leaderboard = await getLeaderboard();
    io.emit("leaderboard", leaderboard);
    res.json({ success: true, newScore: user.score });
  }
);

// --- WebSocket: Send leaderboard on connect ---
io.on("connection", async (socket) => {
  const leaderboard = await getLeaderboard();
  socket.emit("leaderboard", leaderboard);
});

// --- Demo: Issue JWT for testing ---
app.post("/api/login", async (req: Request, res: Response) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Missing username" });
  let user = await User.findOneBy({ username });
  if (!user) {
    user = User.create({ username, score: 0 });
    await user.save();
  }
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  res.json({ token });
});

// --- Start Server after DB Init ---
const PORT = process.env.PORT || 3000;
AppDataSource.initialize()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("TypeORM Data Source initialization error:", err);
  });
