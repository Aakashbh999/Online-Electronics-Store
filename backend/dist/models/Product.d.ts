import mongoose, { Schema, Document } from "mongoose";
export type ProductCategory = "Home Appliances" | "Lighting" | "Wiring & Accessories" | "Power Solutions" | "Tools & Hardware";
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
    productCategory: ProductCategory;
    brand: string;
    specifications: ISpecification[];
    productImg: IProductImg[];
    description?: string;
    stockQuantity: number;
    minimumStockAlert: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Product: mongoose.Model<IProduct, {}, {}, {
    id: string;
}, Document<unknown, {}, IProduct, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, Schema<IProduct, mongoose.Model<IProduct, any, any, any, any, any, IProduct>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, IProduct, Document<unknown, {}, IProduct, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, "id"> & mongoose.HydratedDocumentOverrides<{
    id: string;
}>, {
    _id?: mongoose.SchemaDefinitionProperty<mongoose.Types.ObjectId, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    name?: mongoose.SchemaDefinitionProperty<string, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    sku?: mongoose.SchemaDefinitionProperty<string, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    productCategory?: mongoose.SchemaDefinitionProperty<ProductCategory, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    brand?: mongoose.SchemaDefinitionProperty<string, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    specifications?: mongoose.SchemaDefinitionProperty<ISpecification[], IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    productImg?: mongoose.SchemaDefinitionProperty<IProductImg[], IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    description?: mongoose.SchemaDefinitionProperty<string | undefined, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    stockQuantity?: mongoose.SchemaDefinitionProperty<number, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    minimumStockAlert?: mongoose.SchemaDefinitionProperty<number, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    createdAt?: mongoose.SchemaDefinitionProperty<Date, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
    updatedAt?: mongoose.SchemaDefinitionProperty<Date, IProduct, Document<unknown, {}, IProduct, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<IProduct & Required<{
        _id: mongoose.Types.ObjectId;
    }> & {
        __v: number;
    }, "id"> & mongoose.HydratedDocumentOverrides<{
        id: string;
    }>>;
}, IProduct>, IProduct>;
export {};
//# sourceMappingURL=Product.d.ts.map