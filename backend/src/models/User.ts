import mongoose from "mongoose";
import { Schema, Document } from "mongoose";

export type UserRole = "admin" | "user";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  address?: {
    streetAddress: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  phoneNumber?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      minLength: 10,
      trim: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
      minLength: 60,
      maxLength: 60,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      streetAddress: { type: String, trim: true },
      city: { type: String, trim: true },
      province: { type: String, trim: true },
      postalCode: { type: String },
      country: { type: String, trim: true },
    },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("user", UserSchema);
