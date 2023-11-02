import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ContactIcon from "@mui/icons-material/ContactMail";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Define the width of the drawer
const drawerWidth = 240;

// List of navigation items
const navItems = [
  { label: "Home", path: "/home", icon: <HomeIcon sx={{ color: "#fff" }} /> },
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: <DashboardIcon sx={{ color: "#fff" }} />,
  },
  {
    label: "Contact",
    path: "/contact",
    icon: <ContactIcon sx={{ color: "#fff" }} />,
  },
];

// The NavigationBar component is a part of a web application using React and Material-UI
export default function NavigationBar(props) {
  const { window } = props;
  const navigate = useNavigate();

  // Use React state to manage the state of the drawer on mobile devices
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Use React state to manage the active navigation item
  const [activeNavItem, setActiveNavItem] = React.useState(null);

  // Event handler for opening or closing the mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogOut = (e) => {
    navigate("/");
    setActiveNavItem(null);
  };

  // The content of the drawer
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        ACTOR OF ALL TIME
      </Typography>
      <Divider />
      <List>
        {/* Create a list of navigation items */}
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {/* Navigation items are buttons that can be clicked to navigate to different pages */}
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{ textAlign: "center" }}
              iconPosition="left"
              iconStyle={{ marginRight: 5 }}
              onClick={() => setActiveNavItem(item.label)}
              selected={activeNavItem === item.label}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} sx={{ color: "#fff" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Determine the container for the drawer
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ background: "linear-gradient(to right, #00FFFF, #0000ff)" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
              color: "#FFD700",
              textShadow: "2px 2px #000000",
            }}
          >
            ACTOR OF ALL TIME
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Link to={item.path}>
                <Button
                  key={item.label}
                  sx={{
                    color: "#fff",
                    backgroundColor:
                      activeNavItem === item.label
                        ? "lightsalmon"
                        : "transparent",

                    borderRadius: 20,
                    padding: "5px 20px",
                    margin: "0 10px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "lightblue",
                      color: "#000",
                    },
                  }}
                  onClick={() => setActiveNavItem(item.label)}
                  selected={activeNavItem === item.label}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Button color="inherit" onClick={handleLogOut}>
            <LogoutIcon />
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
