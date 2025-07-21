import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { keys } from "../../../config/const";
import { ILoginRequest } from "./user.interfaces";

export class UserController {
  static async login(req: Request, res: Response) {
    try {
      const { username }: ILoginRequest = req.body;
      if (!username) {
        return res.status(400).json({ error: "Missing username" });
      }

      let user = await UserService.findByUsername(username);
      if (!user) {
        user = await UserService.createUser(username);
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        keys.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          score: user.score,
        },
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getLeaderboard(req: Request, res: Response) {
    try {
      const leaderboard = await UserService.getLeaderboard();
      res.json({ leaderboard });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateScore(req: Request, res: Response) {
    try {
      const userId = (req as any).user.userId;
      const updatedUser = await UserService.incrementScore(userId);
      const rank = await UserService.getUserRank(userId);

      res.json({
        success: true,
        newScore: updatedUser.score,
        rank,
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
