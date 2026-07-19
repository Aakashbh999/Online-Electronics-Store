import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("the jwt secret token not found in .env");
  }
  return secret;
};

export const profile = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    const role = req.user.role;
    if (role === "user") res.status(200).json({ message: "Hello User!" });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * @desc    Register a new user
 * @route   /api/auth/register
 * @access  public
 */
export const registerUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: " name, email and password are required",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "email already exist" });
      return;
    }

    const saltRound = 10;
    const passwordHash = await bcrypt.hash(password, saltRound);

    const newUser = await User.create({
      name,
      email,
      passwordHash,
      phoneNumber,
      role: role || "user",
    });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * @desc    Login user
 * @route   api/auth/login
 * @access  public
 */

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, message: "email and password is required" });

      return;
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ success: false, message: "email does not exist" });

      return;
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.passwordHash,
    );

    if (!isPasswordMatch) {
      res
        .status(401)
        .json({ success: false, message: "email or password does not match" });

      return;
    }

    const jwtToken = jwt.sign(
      { id: existingUser._id, role: existingUser.role },
      getJwtSecret(),
      { expiresIn: "24h" },
    );

    res.status(200).json({
      success: true,
      message: "login successful",
      jwtToken,
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
