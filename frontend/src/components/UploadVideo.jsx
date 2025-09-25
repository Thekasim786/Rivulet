import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

function UploadVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleVideoChange = (e) => {
    setVideo(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!title || !description || !video) {
      alert("Please fill all required fields!");
      return;
    }

    setUploading(true);
    setProgress(0);

    // Fake upload simulation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          alert("Video uploaded successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <Box sx={{ maxWidth: 700, margin: "auto" }}>
      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardHeader
          title="Upload New Video"
          subheader="Fill out the details and upload your video"
          sx={{
            background: "linear-gradient(135deg, #183B4E, #67ae6e)",
            color: "white",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
          }}
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Video Title"
            variant="outlined"
            margin="normal"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Select Video File *
            </Typography>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              sx={{ borderRadius: 2 }}
            >
              Choose Video
              <input type="file" hidden onChange={handleVideoChange} />
            </Button>
            {video && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {video.name}
              </Typography>
            )}
          </Box>

          <Box mt={2}>
            <Typography variant="subtitle1" gutterBottom>
              Select Thumbnail (optional)
            </Typography>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ borderRadius: 2 }}
            >
              Choose Thumbnail
              <input type="file" hidden onChange={handleThumbnailChange} />
            </Button>
            {thumbnail && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected: {thumbnail.name}
              </Typography>
            )}
          </Box>

          {uploading && (
            <Box mt={3}>
              <Typography variant="body2" gutterBottom>
                Uploading...
              </Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          )}

          <Box mt={3} textAlign="center">
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleUpload}
              disabled={uploading}
              sx={{ borderRadius: 2, px: 4 }}
            >
              {uploading ? "Uploading..." : "Upload Video"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default UploadVideo;
