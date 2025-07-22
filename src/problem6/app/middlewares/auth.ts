import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { keys } from "../../config/const";

interface AuthRequest extends Request {
  user?: { userId: number; username: string };
}

export function authenticate(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = auth.split(" ")[1];
  try {
    const payload = jwt.verify(token, keys.JWT_SECRET) as {
      userId: number;
      username: string;
    };
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}
