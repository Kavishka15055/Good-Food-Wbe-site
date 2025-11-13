// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cart.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/cart", cartRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);


app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
