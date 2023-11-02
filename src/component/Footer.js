import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton, Link } from "@mui/material";
import { Facebook, Instagram } from "@mui/icons-material";

const Footer = () => {
  const mediaLinks = [
    { href: "https://www.facebook.com/", icon: <Facebook /> },
    { href: "https://www.instagram.com/", icon: <Instagram /> },
  ];

  const contactInfo = [
    { label: "Phone:", value: "+0967895752" },
    { label: "Address:", value: "FPT University, Campus HCM, NVHSV" },
    { label: "Email:", value: "phucnmtde170689@fpt.edu.vn" },
  ];

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Subscribe the email to your newsletter
    setIsPopupOpen(true);
  };

  useEffect(() => {
    let timeoutId;
    if (isPopupOpen) {
      timeoutId = setTimeout(() => {
        setIsPopupOpen(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [isPopupOpen]);

  return (
    <div className="footer">
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6">Media</Typography>
            <ul>
              {mediaLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <IconButton>{link.icon}</IconButton>
                  </Link>
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={6} sm={4}>
            <Typography variant="h6">Contact</Typography>
            <ul>
              {contactInfo.map((info) => (
                <li key={info.label}>
                  {info.label} {info.value}
                </li>
              ))}
            </ul>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6">Subscribe to our newsletter</Typography>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
              />
              <button className="subscribe-button" type="submit">
                Subscribe
              </button>
            </form>
          </Grid>
        </Grid>

        {isPopupOpen && (
          <div
            sx={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 999,
            }}
          >
            <Typography variant="h6">Thank You!</Typography>
            <p>Your email has been successfully subscribed.</p>
          </div>
        )}
      </Box>
    </div>
  );
};

export default Footer;
