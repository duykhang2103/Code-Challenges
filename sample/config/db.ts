import mongoose from "mongoose";
import { errorLogger, infoLogger } from "../common/logger";
import { keys } from "./const";

const connectToDB = async () => {
  try {
    await mongoose.connect(keys.MONGO_URI, {
      dbName: keys.MONGO_DB_NAME,
    });
    infoLogger.info("Connected to MongoDB");
  } catch (error) {
    console.log(keys.MONGO_URI);
    errorLogger.error("Error connecting to MongoDB", error);
  }
};

export default connectToDB;
