import { Router } from "express";
import { UserController } from "./user.controller";
import { authenticate } from "../../middlewares/auth";

const router = Router();

router.post("/login", UserController.loginOrRegister);
router.get("/leaderboard", authenticate, UserController.getLeaderboard);
router.post("/score", authenticate, UserController.updateScore);

export { router as userRouter };
