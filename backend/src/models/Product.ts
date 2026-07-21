import mongoose, { Schema, Document } from "mongoose";

export const PRODUCT_CATEGORIES = [
  "Home Appliances",
  "Lighting",
  "Wiring & Accessories",
  "Power Solutions",
  "Tools & Hardware",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
interface ISpecification {
  key: string;
  value: string;
  isVariant: boolean;
}

interface IProductImg {
  url: string;
  publicId: string;
  isMain: boolean;
}

export interface IProduct extends Document {
  name: string;
  sku: string;
  price: number;
  category: ProductCategory;
  brand: string;
  specifications: ISpecification[];
  image: IProductImg[];
  description?: string;
  stockQuantity: number;
  minStockAlert: number;
  variantTitle: string;
  isMasterProduct: boolean;
  parentProductId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const SpecificationsSchema: Schema<ISpecification> = new Schema({
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

const ProductImgSchema: Schema<IProductImg> = new Schema({
  url: { type: String, required: true, trim: true },
  publicId: { type: String, required: true, trim: true },
  isMain: { type: Boolean, default: false },
});

const ProductSchema: Schema<IProduct> = new Schema(
  {
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
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: PRODUCT_CATEGORIES,
      required: true,
    },
    brand: { type: String, trim: true },
    specifications: [SpecificationsSchema],
    image: {
      type: [ProductImgSchema],
      required: true,
      validate: function (val: IProductImg[]) {
        return val.length >= 1 && val.length <= 8;
      },
      message: "A Product must have between 1 and 8 images.",
    },
    description: { type: String, trim: true },
    stockQuantity: { type: Number, required: true, min: 0, default: 0 },
    minStockAlert: { type: Number, required: true, min: 0, default: 5 },

    variantTitle: { type: String, trim: true },
    parentProductId: {
      type: Schema.Types.ObjectId,
      ref: "product",
      default: null,
    },
    isMasterProduct: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

ProductSchema.index({ name: "text", brand: "text", sku: "text" });

export const Product = mongoose.model("product", ProductSchema);
