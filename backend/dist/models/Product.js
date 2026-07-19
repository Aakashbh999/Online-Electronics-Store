import mongoose, { Schema, Document } from "mongoose";
const SpecificationsSchema = new Schema({
    key: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: String,
        required: true,
        trim: true,
    },
    isVariant: { type: Boolean, default: false },
});
const ProductImgSchema = new Schema({
    url: { type: String, required: true, trim: true },
    publicId: { type: String, required: true, trim: true },
    isMain: { type: Boolean, default: false },
});
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    sku: {
        type: String,
        required: true,
        trim: true,
    },
    productCategory: {
        type: String,
        enum: [
            "Home Appliances",
            "Lighting",
            "Wiring & Accessories",
            "Power Solutions",
            "Tools & Hardware",
        ],
        required: true,
    },
    brand: { type: String, trim: true },
    specifications: [SpecificationsSchema],
    productImg: {
        type: [ProductImgSchema],
        required: true,
        validate: function (val) {
            return val.length >= 1 && val.length <= 8;
        },
        message: "A Product must have between 1 and 8 images.",
    },
    description: { type: String, trim: true },
    stockQuantity: { type: Number, required: true, min: 0, default: 0 },
    minimumStockAlert: { type: Number, required: true, min: 0, default: 5 },
}, {
    timestamps: true,
});
ProductSchema.index({ name: "text", brand: "text", sku: "text" });
export const Product = mongoose.model("product", ProductSchema);
//# sourceMappingURL=Product.js.map