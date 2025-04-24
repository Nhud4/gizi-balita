import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, username: string) => {
  const payload = {
    userId,
    username,
  };

  const secretKey = process.env.JWT_SECRET as string;
  const expiresIn = "1d";

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

export const decodeToken = (token: string) => {
  const decoded = jwt.decode(token);
  return decoded;
};

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
    return;
  }
};

export const basicAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.status(401).send("Authentication required.");
    return;
  }

  const base64Credentials = authHeader.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );
  const [reqUser, reqPass] = credentials.split(":");

  if (
    reqUser !== process.env.BASIC_USER &&
    reqPass !== process.env.BASIC_PASS
  ) {
    res.status(401).send("Access denied.");
    return;
  }

  next();
};
