// import { nanoid } from "nanoid";
import randomString from "randomstring";
import Url from "../app/modules/url/url.model";

export const generateUniqueId = async () => {
  while (true) {
    // const id = nanoid(6);
    const id = randomString.generate(6);
    const existingUrl = await Url.findOne({ short: id });
    if (!existingUrl) return id;
  }
};
