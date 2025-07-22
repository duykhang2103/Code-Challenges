import { User } from "./user.model";
import { ILeaderboardEntry } from "./user.interfaces";
import { AppDataSource } from "../../../config/db";
import ApiError from "../../../common/error";
import * as jwt from "jsonwebtoken";
import { keys } from "../../../config/const";
import { getIO } from "../../../socket";

export class UserService {
  static async getLeaderboard(): Promise<ILeaderboardEntry[]> {
    return await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select(["user.id", "user.username", "user.score"])
      .orderBy("user.score", "DESC")
      .addOrderBy("user.id", "ASC")
      .limit(10)
      .getMany();
  }

  static async loginOrRegister(username: string): Promise<{
    user: User;
    isNewUser: boolean;
    token: string;
  }> {
    if (!username) {
      throw new ApiError(400, "Username is required");
    }
    let user = await AppDataSource.getRepository(User).findOneBy({
      username,
    });
    let isNewUser = false;
    if (!user) {
      isNewUser = true;
      user = AppDataSource.getRepository(User).create({
        username,
        score: 0,
      });
      user = await AppDataSource.getRepository(User).save(user);
    }
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      keys.JWT_SECRET,
      { expiresIn: "24h" }
    );
    return { user, isNewUser, token };
  }

  static async updateScore(
    userId: number
  ): Promise<{ newScore: number; rank: number }> {
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: userId,
    });
    if (!user) throw new ApiError(404, "User not found");
    user.score += 1;
    const updatedUser = await AppDataSource.getRepository(User).save(user);
    const rank = await this.getUserRank(userId);

    // Emit the updated leaderboard to all connected clients
    const io = getIO();
    if (io) {
      const leaderboard = await this.getLeaderboard();
      io.emit("leaderboard", leaderboard);
    }
    return { newScore: updatedUser.score, rank };
  }

  static async getUserRank(userId: number): Promise<number> {
    const result = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .select("COUNT(*) + 1", "rank")
      .where("user.score > (SELECT score FROM users WHERE id = :userId)", {
        userId,
      })
      .getRawOne();
    return parseInt(result.rank);
  }
}
