
import { Buffer } from "buffer";

export const DecodeBase64 = (str) => {
    let buffered = Buffer.from(str, "base64");
    let s = buffered.toString();
    return s;
  };
