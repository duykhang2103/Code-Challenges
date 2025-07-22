import bcrypt from "bcrypt";
import { keys } from "../config/const";

const saltRounds = keys.SALT_ROUNDS;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
