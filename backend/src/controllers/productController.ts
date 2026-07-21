import type { Request, Response } from "express";
import { Product, PRODUCT_CATEGORIES } from "../models/Product.js";
import type { AuthenticatedRequest } from "../middleware/authMiddleware.js";

/**
 *
 * @desc        pagination for products
 * @route      /products
 * @access     public
 */
export const getProducts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const category = req.query.category;

    if (category) {
      const isValidCategory = PRODUCT_CATEGORIES.includes(category as any);
      if (!isValidCategory) {
        res.status(400).json({
          success: false,
          message: `product category: ${category} does not exist`,
        });
        return;
      }
    }

    //just to conform the value not be zero
    const sanitizedPage = Math.max(1, page);
    const sanitizedLimit = Math.max(1, limit);

    const skip = (sanitizedPage - 1) * sanitizedLimit;
    const filterQuery: Record<string, string> = {};
    if (category) {
      filterQuery.category = category as string;
    }

    const [products, totalProductCount] = await Promise.all([
      Product.find(filterQuery)
        .skip(skip)
        .limit(sanitizedLimit)
        .sort({ createdAt: -1 }),

      Product.countDocuments(filterQuery),
    ]);

    const totalPage = Math.ceil(totalProductCount / sanitizedLimit);
    const hasNextPage = sanitizedPage < totalPage;
    const hasPrevPage = sanitizedPage > 1;

    res.status(200).json({
      success: true,
      message: "Product list ",
      Itemcategory: category,
      pagination: {
        totalItems: totalProductCount,
        totalPage: totalPage,
        currentPage: sanitizedPage,
        currenItemPerPage: sanitizedLimit,
        hasNextPage,
        hasPrevPage,
      },
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

/**
 * @desc     create product
 * @route    /product/create
 * @access   private (admin)
 */

export const createProduct = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      sku,
      price,
      image,
      category,
      brand,
      specifications,
      description,
      stockQuantity,
      minStockAlert,
    } = req.body;

    if (
      !name ||
      !sku ||
      !category ||
      !specifications ||
      !description ||
      !price ||
      !image ||
      image.length === 0
    ) {
      res
        .status(400)
        .json({ success: false, message: "Missing required product fields." });
      return;
    }
    if (category) {
      const isValidCategory = PRODUCT_CATEGORIES.includes(category as any);
      if (!isValidCategory) {
        res.status(400).json({
          success: false,
          message: `product category: ${category} does not exist`,
        });
        return;
      }
    }

    const skuExist = await Product.findOne({ sku: sku.toUpperCase() });
    if (skuExist) {
      res.status(400).json({
        success: false,
        message: `sku: ${sku.toUpperCase()} already exist.`,
      });
      return;
    }

    const newProduct = await Product.create({
      name,
      sku,
      price,
      image,
      category,
      brand,
      specifications,
      description,
      stockQuantity,
      minStockAlert,
    });

    res.status(201).json({
      success: true,
      message: "new product added.",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};

/**
 * @desc      create childProduct
 * @route     /products/:id/variant
 * @access    private ('admin)
 */

export const createChildProduct = async (
  req: AuthenticatedRequest,
  res: Response,
): Promise<void> => {
  try {
    const parentId = req.params.id;
    const {
      sku,
      price,
      specifications,
      image,
      description,
      stockQuantity,
      minStockAlert,
      variantTitle,
    } = req.body;

    const priceInt = parseInt(price, 10);
    if (
      !sku ||
      priceInt === 0 ||
      !specifications ||
      !image ||
      image.length === 0 ||
      !variantTitle
    ) {
      res.status(400).json({
        success: false,
        message:
          "missing required varient parameters (sku, price, specification, image, variantTitle)",
      });
      return;
    }
    console.log(parentId);
    const parentProduct = await Product.findById(parentId);
    if (!parentProduct) {
      res
        .status(400)
        .json({ success: false, message: " parent product does not exist " });
      return;
    }
    const skuExist = await Product.findOne({ sku: sku.toUpperCase() });
    if (skuExist) {
      res.status(400).json({
        success: false,
        message: `sku: ${sku.toUpperCase()} already exist.`,
      });
      return;
    }

    const newChildProduct = await Product.create({
      name: parentProduct.name,
      sku: sku.toUpperCase(),
      price: price,
      category: parentProduct.category,
      image: image,
      description: description || parentProduct.description,
      stockQuantity: stockQuantity ?? 0,
      minStockAlert: minStockAlert,
      specifications: specifications,
      parentProductId: parentProduct._id,
      variantTitle: variantTitle,
      isMasterProduct: false,
    });

    res.status(201).json({
      success: true,
      message: "child product created successfully. ",
      product: newChildProduct,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
