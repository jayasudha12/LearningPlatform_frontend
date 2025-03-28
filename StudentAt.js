import React, { useState, useEffect, useRef } from "react";
import { Button, Container, Grid, Box, Paper, TextField } from "@mui/material";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import axios from "axios";

const EmployeeDashboard = () => {
  const [capturedImages, setCapturedImages] = useState([]);
  const [faceEmbeddings, setFaceEmbeddings] = useState([]);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const webcamRef = useRef(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        console.log("Loading models...");
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        setIsModelLoaded(true);
        console.log("Models loaded successfully.");
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  const captureImage = async () => {
    if (!isModelLoaded || capturedImages.length >= 5) return;

    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImages([...capturedImages, imageSrc]);

    try {
      const img = await faceapi.bufferToImage(await fetch(imageSrc).then((res) => res.blob()));
      const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();

      if (detections) {
        console.log("Face detected:", detections);
        setFaceEmbeddings((prev) => [...prev, Array.from(detections.descriptor)]);
      } else {
        console.log("No face detected.");
      }
    } catch (error) {
      console.error("Face detection error:", error);
    }
  };

  const handleSubmit = async () => {
    if (faceEmbeddings.length === 0) {
      alert("No face embeddings.");
      return;
    }

    try {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        alert("Unauthorized! Please log in again.");
        return;
      }

      // Prepare FormData to send the image and face embeddings
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date_of_birth", dateOfBirth);
      formData.append("gender", gender);
      formData.append("faceEmbeddings", JSON.stringify(faceEmbeddings));

      // Attach profile image if available
      if (capturedImages.length > 0) {
        const profileImage = await fetch(capturedImages[0]);
        const imageBlob = await profileImage.blob();
        formData.append("image", imageBlob, "profile_image.jpg");
      }

      await axios.put(
        "http://localhost:8000/user/profile", // Update URL if needed
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile updated successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <Grid container sx={{ backgroundColor: "#f0f2f5", minHeight: "100vh", display: "flex" }}>
      <Grid item xs={10}>
        <Container maxWidth="md" sx={{ padding: 4 }}>
          <Paper elevation={4} sx={{ padding: 4, borderRadius: 3, backgroundColor: "white" }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Date of Birth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  fullWidth
                  label="Gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  variant="outlined"
                  margin="dense"
                />
              </Grid>

              <Grid item xs={12}>
                <Box display="flex" justifyContent="center">
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMwAAADACAMAAAB/Pny7AAAAkFBMVEX///8wMzj8/PwAAAAtMDX4+PgyMzUpLDInKCrt7e3m5ubJycr19fXx8fEiJizq6uoaHiXg4OC3t7jR0dGIiYqen6AAChSZmZoAAAwtLjA9PT+mp6gVGiJwcXKvsLEfIid+f4FCREcbHB9hYmMNFBy/wMBJS06QkZJWWFoQEhZmbG0ADAwGCQ4QGR45PUNNU1eqxs7RAAAPDEl... (image content omitted)"
                    alt="attendance illustration"
                    style={{ width: "100%", maxWidth: "300px", borderRadius: 8 }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box mt={4} sx={{ textAlign: "center" }}>
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                style={{
                  width: "100%",
                  borderRadius: 8,
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
                }}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#283593", color: "white", mt: 2 }}
                onClick={captureImage}
                disabled={capturedImages.length >= 5}
              >
                Capture Image
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#283593", color: "white", mt: 2, ml: 2 }}
                onClick={handleSubmit}
                disabled={faceEmbeddings.length === 0}
              >
                Submit Face Embeddings
              </Button>
            </Box>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default EmployeeDashboard;
