import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const generateToken = (userId: string, name: string) => {
  const payload = {
    userId,
    name,
  };

  const secretKey = process.env.JWT_SECRET as string;
  const expiresIn = "1h";

  const token = jwt.sign(payload, secretKey, { expiresIn });

  return token;
};

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
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
