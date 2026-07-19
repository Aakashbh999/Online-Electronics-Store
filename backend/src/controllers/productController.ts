import type { Request, Response } from "express";
import {
  Product,
  PRODUCT_CATEGORIES,
  type ProductCategory,
} from "../models/Product.js";

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
