import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
dotenv.config();
const PORT = process.env.PORT || "5000";
const app = express();
app.use(cors());
app.use(express.json());
connectDB();
app.get("/", (req, res) => {
    res.send("Bhandari Electronic API running successfully!");
});
app.use("/api/auth", authRoutes);
app.listen(PORT, () => {
    console.log(`app is listening on port ${PORT}`);
});
//# sourceMappingURL=server.js.map