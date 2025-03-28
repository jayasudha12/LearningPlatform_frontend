import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Button,
  TextField,
  Grid,
  Container,
  Paper,
  InputAdornment, // For adding icons inside text fields
} from "@mui/material";
import {
  Dashboard,
  Assignment,
  People,
  ExitToApp,
  AddCircle,
  School, // New icon for course title
  Description, // New icon for course description
} from "@mui/icons-material";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Sidebar = ({ handleLogout, activeLink }) => {
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#1a237e",
          color: "white",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ textAlign: "center", my: 3 }}>
        <Avatar sx={{ width: 60, height: 60, mx: "auto", mb: 1 }} />
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Admin
        </Typography>
      </Box>
      <List>
      <ListItem button component={Link} to="/add-course" sx={listStyle(activeLink, "/add-course")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <AddCircle />
          </ListItemIcon>
          <ListItemText primary="Add Course" />
        </ListItem>
        <ListItem button component={Link} to="/" sx={listStyle(activeLink, "/")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/courses" sx={listStyle(activeLink, "/courses")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <Assignment />
          </ListItemIcon>
          <ListItemText primary="View Courses" />
        </ListItem>
        <ListItem button component={Link} to="/course-actions" sx={listStyle(activeLink, "/course-actions")}>
          <ListItemIcon sx={{ color: "#fff" }}>
            <People />
          </ListItemIcon>
          <ListItemText primary="Course Actions" />
        </ListItem>
       
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <ExitToApp style={{ color: "white" }} />
          </ListItemIcon>
          <ListItemText primary="Logout" sx={{ color: "white" }} />
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8000/admin/getAllCourses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses", error);
    }
  };

  const handleAddCourse = async () => {
    const token = localStorage.getItem("token");
    if (!newCourseTitle || !newCourseDescription) {
      alert("Title and description are required.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8000/admin/addCourse",
        { title: newCourseTitle, description: newCourseDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Course Added Successfully!", {
        autoClose: 30000, // Set the duration to 30 seconds
      });
      fetchCourses(); // Refresh course list
      setNewCourseTitle("");
      setNewCourseDescription("");
      // Redirect after 2 seconds to give time for the toast message
      setTimeout(() => navigate("/courses"), 2000);
    } catch (error) {
      console.error("Error adding course", error);
      toast.error("Failed to add course. Please try again.");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar handleLogout={() => {}} activeLink={location.pathname} />
      <Container sx={{ mt: 5, ml: 0 }}> {/* Adjusting margin to move content to left */}
        <Typography variant="h4" align="center" gutterBottom>
          <Assignment sx={{ fontSize: 40, verticalAlign: "middle", mr: 2 }} />
          Course Management
        </Typography>
        <Typography variant="body2" align="center" sx={{ fontStyle: "italic", color: "#555" }}>
          "The best way to predict the future is to create it."
        </Typography>
        <br></br>
        <Paper sx={{ p: 4, maxWidth: 500, mx: "auto" }}>
          <Typography variant="h6" gutterBottom>
            Add New Course
          </Typography>
          <TextField
            label="Course Title"
            fullWidth
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <School />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Course Description"
            fullWidth
            value={newCourseDescription}
            onChange={(e) => setNewCourseDescription(e.target.value)}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Description />
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleAddCourse}
          >
            Add Course
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

const listStyle = (activeLink, link) => ({
  color: "#fff",
  "&:hover": { backgroundColor: "#303f9f" },
  backgroundColor: activeLink === link ? "#303f9f" : "transparent",
});

// Toastify container to display the success message
export default () => (
  <>
    <CourseManagement />
    <ToastContainer />
  </>
);
