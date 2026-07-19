import mongoose from "mongoose";
import { Schema, Document } from "mongoose";
const UserSchema = new Schema({
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
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 12,
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
}, {
    timestamps: true,
});
export const User = mongoose.model("user", UserSchema);
//# sourceMappingURL=User.js.map