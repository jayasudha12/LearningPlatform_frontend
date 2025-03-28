import React from "react";
import { Button } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from './Register';
import Login from "./Login";
import Course from"./Course";
import SchoolIcon from '@mui/icons-material/School'; 
import Lesson from "./Lesson";
import EmployeeDashboard from './StudentAt';

import image from './image.jpeg';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/course" element={<Course />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/attendance" element={<EmployeeDashboard/>}/>
       
      </Routes>
    </Router>
  );
};

const HeroSection = () => {

  const styles = {
    heroContainer: {
      width: "100vw",
      height: "100vh", 
      background: `url(${image}) no-repeat center center fixed`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      position: "relative",
      overflow: "hidden",
      zIndex: 0,
    },
    navbar: {
      position: "absolute",
      top: 0,
      width: "95%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 50px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      zIndex: 10,
      backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      marginLeft: "-15px", 
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
      fontSize:"19px"
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
    heroContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      textAlign: "left",
      color: "black",
      zIndex: 10,
      marginLeft: "50px",
    },
    heroTitle: {
      fontSize: "50px",
      fontWeight: "800",
      lineHeight: "1.3",
      textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
    },
    heroDescription: {
      marginTop: "15px",
      fontSize: "20px",
      color: "black",
      fontWeight: "500",
    },
    buttonGroup: {
      marginTop: "25px",
      display: "flex",
      gap: "20px",
    },
    button: {
      borderRadius: "8px",
      padding: "14px 24px",
      fontWeight: "600",
      textTransform: "uppercase",
      boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
      transition: "all 0.3s ease-in-out",
    },
    buttonHover: {
      transform: "translateY(-3px)",
    },
  };

  return (
    <div style={styles.heroContainer}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          {/* Replaced HomeIcon with SchoolIcon */}
          <SchoolIcon style={{ fontSize: "40px", color: "#1f2937" }} />
          <div style={styles.logoText}>SkillVerse</div>
        </div>
        <div style={styles.navLinks}>
          <a href="#" style={{ ...styles.navLink, ...styles.navLinkHover }}>Home</a>
          <a href="#" style={{ ...styles.navLink, ...styles.navLinkHover }}>Blog</a>
          <a href="\login" style={{ ...styles.navLink, ...styles.navLinkHover }}>Login</a>
          <a href="\register" style={{ ...styles.navLink, ...styles.navLinkHover }}>Register</a>
          <a href="#" style={{ ...styles.navLink, ...styles.navLinkHover }}>About Us</a>
        </div>
      </nav>

      {/* Hero Content */}
      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Boost up your skills with <br /> a new way of learning.</h1>
        <p style={styles.heroDescription}>
          Learn from the falls and rise stronger with every challenges faced <br />and grow  every step of your career prospects with our expertly<br/> crafted courses and expert Learning.
        </p>

        <div style={styles.buttonGroup}>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{
              ...styles.button,
              backgroundColor: "white",
              borderColor: "#3f51b5",
              color: "#3f51b5",
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Take a Tour
          </Button>
        </div>
      </div>

     
    </div>
  );
};

export default App;
