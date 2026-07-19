import { Router } from "express";
import {
  registerUser,
  loginUser,
  profile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizedRoles } from "../middleware/roleMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, authorizedRoles("admin"), profile);

export default router;
