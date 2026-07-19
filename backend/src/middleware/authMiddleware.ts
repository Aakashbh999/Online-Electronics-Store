import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface jwtPayload {
  id: string;
  role: string;
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  let jwtToken: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      jwtToken = req.headers.authorization.split(" ")[1];

      if (!jwtToken) {
        res.status(401).json({ message: "not authorized, token missing " });
      }

      let decoded = jwt.verify(
        jwtToken as string,
        process.env.JWT_SECRET as string,
      );

      if (
        typeof decoded == "object" &&
        decoded !== null &&
        "id" in decoded &&
        "role" in decoded
      ) {
        const verifiedPayload = decoded as jwtPayload;

        req.user = {
          id: verifiedPayload.id,
          role: verifiedPayload.role,
        };
        next();
      } else {
        res.status(401).json({
          success: false,
          message: "not authorized, invalid jwt payload structure ",
        });
      }
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.status(401).json({ success: false, message: "token not provided " });
  }
};
