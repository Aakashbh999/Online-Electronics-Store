import mongoose from "mongoose";
import { Document } from "mongoose";
type UserRole = "admin" | "user";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
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
export declare const User: mongoose.Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, mongoose.DefaultSchemaOptions> & IUser & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUser>;
export {};
//# sourceMappingURL=User.d.ts.map