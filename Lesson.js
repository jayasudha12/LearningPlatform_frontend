import React, { useState } from "react";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";

const AddLesson = ({ courseId }) => {
  const [open, setOpen] = useState(false);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [pdfFile, setPdfFile] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleAddLesson = async () => {
    const formData = new FormData();
    formData.append("courseId", courseId);
    formData.append("title", lessonTitle);
    formData.append("description", lessonDescription);
    formData.append("videoUrl", videoUrl);
    if (pdfFile) {
      formData.append("pdf", pdfFile);
    }

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    try {
      // Send the POST request with the token in the header
      await axios.post("http://localhost:8000/admin/addLesson", formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      handleClose(); // Close the dialog
    } catch (error) {
      console.error("Error adding lesson", error);
    }
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Lesson
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Lesson</DialogTitle>
        <DialogContent>
          <TextField
            label="Lesson Title"
            fullWidth
            value={lessonTitle}
            onChange={(e) => setLessonTitle(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Lesson Description"
            fullWidth
            value={lessonDescription}
            onChange={(e) => setLessonDescription(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Video URL"
            fullWidth
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            margin="normal"
          />
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            style={{ marginTop: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddLesson} color="primary">
            Add Lesson
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddLesson;
