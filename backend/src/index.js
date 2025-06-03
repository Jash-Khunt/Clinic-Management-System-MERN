import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import patientRoutes from "./routes/patients.route.js";
import tokenRoutes from "./routes/tokens.route.js";
import visitRoutes from "./routes/visits.route.js";
import billRoutes from "./routes/bills.route.js";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const port = process.env.PORT;

app.use("/api/auth", authRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/token", tokenRoutes);
app.use("/api/visit", visitRoutes);
app.use("/api/bill", billRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is runing at ${port}`);
  connectDB();
});
