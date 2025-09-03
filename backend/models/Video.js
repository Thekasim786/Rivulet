// models/Video.js
import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  filename: String,
  thumbnail: String,
});

const Video = mongoose.model("Video", videoSchema);

export default Video;
