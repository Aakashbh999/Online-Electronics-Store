import type { NextFunction, Request, Response } from "express";
import type { UserRole } from "../models/User.js";
import type { AuthenticatedRequest } from "./authMiddleware.js";

/**
 * @desc       Middleware to restrict route access to specific user roles
 * @route     api/auth/me
 * @param   allowedRoles allowed roles permitted to access route
 */

export const authorizedRoles = (...allowRoles: UserRole[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authorization failed: user context missing.",
        });

        return;
      }

      if (!allowRoles.includes(req.user.role as UserRole)) {
        res.status(403).json({
          success: false,
          message: `unauthorized to access, ${req.user.role} not allowed to access.`,
        });

        return;
      }

      res.status(200).json({ success: true, message: "authorized" });
      next();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  };
};
