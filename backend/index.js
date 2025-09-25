// index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
// const AuthRouter = require('./Routes/AuthRouter');

import AuthRouter from "./Routes/AuthRouter.js";
import connectDB from "./models/db.js";
import videoRoutes from "./Routes/videoRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/auth', AuthRouter);

// For static video serving (HLS playlists, segments, thumbnails)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/videos", express.static(path.join(__dirname, "video")));
app.use("/thumbnails", express.static("thumbnails"));

// Routes
app.use("/api/videos", videoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
