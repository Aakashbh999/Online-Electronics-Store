import { Router } from "express";
import {
  createChildProduct,
  createProduct,
  getProducts,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizedRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.get("/", getProducts);
router.post("/", protect, authorizedRoles("admin"), createProduct);
router.post(
  "/:id/variant",
  protect,
  authorizedRoles("admin"),
  createChildProduct,
);

export default router;
