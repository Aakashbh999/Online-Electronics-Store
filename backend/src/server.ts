import express from "express";
import type { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
dotenv.config();

const PORT = process.env.PORT || "5000";
const app: Application = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Bhandari Electronic API running successfully.!");
});

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});
