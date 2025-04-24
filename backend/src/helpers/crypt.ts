import crypto from "crypto";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export const hash = (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
};

export const compareHash = (text: string, hash: string) => {
  return hash === crypto.createHash("sha256").update(text).digest("hex");
};
