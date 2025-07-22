import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "./user.service";
import { keys } from "../../../config/const";
import { ILoginRequest } from "./user.interfaces";
import { sendSuccessResponse } from "../../../common/successResponse";

export class UserController {
  static async loginOrRegister(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { username }: ILoginRequest = req.body;
      if (!username) {
        return next(new Error("Username is required"));
      }
      const { user, isNewUser, token } = await UserService.loginOrRegister(
        username
      );
      sendSuccessResponse(
        res,
        {
          token,
          user: {
            id: user.id,
            username: user.username,
            score: user.score,
          },
        },
        200,
        isNewUser
          ? "User logged in successfully"
          : "User registered successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await UserService.getLeaderboard();
      sendSuccessResponse(
        res,
        leaderboard,
        200,
        "Leaderboard fetched successfully"
      );
    } catch (error) {
      next(error);
    }
  }

  static async updateScore(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.userId;
      const { newScore, rank } = await UserService.updateScore(userId);
      sendSuccessResponse(
        res,
        {
          newScore,
          rank,
        },
        200,
        "Score updated successfully"
      );
    } catch (error) {
      next(error);
    }
  }
}
