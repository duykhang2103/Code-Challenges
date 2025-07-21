import { User } from "./user.model";
import { ILeaderboardEntry, IUser } from "./user.interfaces";

export class UserService {
  static async getLeaderboard(): Promise<ILeaderboardEntry[]> {
    return await User.createQueryBuilder("user")
      .select(["user.id", "user.username", "user.score"])
      .orderBy("user.score", "DESC")
      .addOrderBy("user.id", "ASC")
      .limit(10)
      .getMany();
  }

  static async findByUsername(username: string): Promise<User | null> {
    return await User.findOneBy({ username });
  }

  static async findById(id: number): Promise<User | null> {
    return await User.findOneBy({ id });
  }

  static async createUser(username: string): Promise<User> {
    const user = User.create({ username, score: 0 });
    return await user.save();
  }

  static async incrementScore(userId: number): Promise<User> {
    const user = await User.findOneBy({ id: userId });
    if (!user) throw new Error("User not found");
    user.score += 1;
    return await user.save();
  }

  static async getUserRank(userId: number): Promise<number> {
    const result = await User.createQueryBuilder("user")
      .select("COUNT(*) + 1", "rank")
      .where("user.score > (SELECT score FROM users WHERE id = :userId)", {
        userId,
      })
      .getRawOne();
    return parseInt(result.rank);
  }
}
