import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Link,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import SchoolIcon from "@mui/icons-material/School"; // School icon import
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import Carousel styles

// Navbar Component
const Navbar = () => {
  const styles = {
    navbar: {
      position: "fixed", // Fix the navbar to the top
      top: 0,
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 50px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      zIndex: 10,
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    logoText: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#1f2937",
      letterSpacing: "2px",
      textTransform: "uppercase",
    },
    navLinks: {
      display: "flex",
      gap: "30px",
      alignItems: "center",
      fontSize: "19px",
    },
    navLink: {
      textDecoration: "none",
      color: "black",
      fontWeight: "600",
      fontSize: "20px",
      transition: "color 0.3s ease, transform 0.3s ease",
    },
    navLinkHover: {
      color: "#3f51b5",
      transform: "translateY(-2px)",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <SchoolIcon sx={{ fontSize: 30, color: "#1f2937" }} /> {/* School icon */}
        <div style={styles.logoText}>SkillVerse</div>
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={{ ...styles.navLink, ...styles.navLinkHover }}>
          Home
        </Link>
        <Link to="/login" style={{ ...styles.navLink, ...styles.navLinkHover }}>
          Login
        </Link>
        <Link to="/register" style={{ ...styles.navLink, ...styles.navLinkHover }}>
          Register
        </Link>
        <Link to="#" style={{ ...styles.navLink, ...styles.navLinkHover }}>
          About Us
        </Link>
        <Link to="/page" style={{ ...styles.navLink, ...styles.navLinkHover }}>
          About Us
        </Link>
      </div>
    </nav>
  );
};

// Login Component
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student"); // Default to 'student'
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Define the API endpoint based on the selected role
    const endpoint = role === "student" ? "/user/login" : "/admin/login";

    try {
      const response = await axios.post(`http://localhost:8000${endpoint}`, {
        email,
        password,
      });

      // Save the token to localStorage
      localStorage.setItem("token", response.data.token);

      // Optionally, save the role in localStorage to handle redirects
      localStorage.setItem("role", role);

      // Redirect based on role
      if (role === "admin") {
        navigate("/attendance"); // Redirect to admin page after successful login
      } else {
        navigate("/courses"); // Redirect to courses page for students
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f3f4f6" }}>
      {/* Include the Navbar here */}
      <Navbar />

      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          padding: 7,
          boxSizing: "border-box",
          marginTop: "0px", // Add margin to prevent content from hiding under the navbar
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1.2,
            padding: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <Typography variant="h5" color="#1e40af" fontWeight="bold" mb={2} display="flex" alignItems="center">
            <LoginIcon sx={{ mr: 1 }} />
            Login
          </Typography>

          <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 2, fontStyle: "italic", fontSize: "14px" }}>
            "Start your journey with us. Login to access your Learning!"
          </Typography>

          {errorMessage && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}

          <form onSubmit={handleSubmit} style={{ width: "90%" }}>
            <TextField
              fullWidth
              label="Email"
              type="email"
              variant="outlined"
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ mb: 2, backgroundColor: "#e0e7ff" }}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="dense"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 2, backgroundColor: "#e0e7ff" }}
            />
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                Role:
              </Typography>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: "#1e40af",
                color: "#fff",
                fontWeight: "bold",
                ":hover": { backgroundColor: "#3b82f6" },
              }}
              disabled={loading}
              startIcon={<LoginIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
            </Button>
          </form>

          <Box sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 2 }}>
            <Link
              href="/register"
              sx={{
                color: "#1e40af",
                textDecoration: "none",
                fontSize: "19px",
                display: "flex",
                alignItems: "center",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Don't have an account? Register
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            backgroundColor: "#ffffff",
          }}
        >
          <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={2000}>
            <div>
              <img
                src="https://img.freepik.com/premium-vector/online-registration-illustration-design-concept-websites-landing-pages-other_108061-938.jpg"
                alt="Register Illustration 1"
                style={{ height: "90%", objectFit: "cover" }}
              />
            </div>
            <div>
              <img
                src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg"
                alt="Register Illustration 3"
                style={{ height: "90%", objectFit: "cover" }}
              />
            </div>
            <div>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/online-registration-illustration-download-in-svg-png-gif-file-formats--user-register-form-sign-create-account-pack-network-communication-illustrations-6381807.png"
                alt="Register Illustration 2"
                style={{ height: "90%", objectFit: "cover" }}
              />
            </div>
          </Carousel>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
