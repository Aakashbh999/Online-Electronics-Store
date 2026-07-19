import { Router } from "express";
const router = Router();
//placeholder for login
router.post("/login", async (req, res) => {
    try {
        res.status(200).json({ message: "login route established successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
//placeholder for Registration
router.get("/register", async (req, res) => {
    try {
        res
            .status(200)
            .json({ message: "registration route established successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;
//# sourceMappingURL=authRoutes.js.map