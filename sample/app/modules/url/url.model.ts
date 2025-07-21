import mongoose from "mongoose";
import { IUrl } from "./url.interfaces";

const urlSchema = new mongoose.Schema<IUrl>({
  original: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  password: { type: String, default: undefined },
  numOfClicks: { type: Number, default: 0 },
  lastClickedAt: { type: Date, default: undefined },
  expiresAt: { type: Date, default: undefined },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Url = mongoose.model<IUrl>("Url", urlSchema);
export default Url;
