import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { motion } from "framer-motion";
import { useThemeMode } from "../contexts/themeContext";

// Material-UI Components
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Modal from "@mui/material/Modal";
import { Grid, Switch } from "@mui/material";
import { useTheme } from "@mui/system";

// Material-UI Icons
import MoreIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AllInboxOutlinedIcon from "@mui/icons-material/AllInboxOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { styled } from "@mui/material/styles";

const Navbar = () => {
  const history = useNavigate();
  const theme = useTheme();
  const [search, setSearch] = useState([]);
  const user = JSON.parse(localStorage?.getItem("user"));
  const { darkMode, handleDarkMode } = useThemeMode();

  // Material-Ui
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // getModalStyle is not a pure function, we roll the style only on the first render
  const modalStyle = () => {
    return {
      top: `0%`,
      left: `30%`,
      // transform: `translate(50%, 50%)`,
      border: "1px solid rgba(0, 0, 0, 0.015)",
      position: "absolute",
      width: 400,
      backgroundColor: darkMode
        ? "rgba(225, 228, 230, 1)"
        : theme.palette.common.white,
      // border: "1px solid rgba(0, 0, 0, 0.015)",
      boxShadow: theme.shadows[4],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "10px",
      "&:focus": {
        border: "1px solid rgba(0, 0, 0, 0.015)",
      },
    };
  };
  const [openModal, setOpenModal] = useState(false);

  const findUser = (pattern) => {
    if (!(pattern === "")) {
      const URL = `http://localhost:8585/users-research`;
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      };
      Axios.post(URL, { pattern }, config).then((res) => {
        setSearch(res.data);
      });
    }
  };

  const handleOpenModal = () => {
    handleMobileMenuClose();
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogOut = () => {
    localStorage.clear();
    history("/login");
  };

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleOpenModal}>
        <IconButton size="large">
          <SearchOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem component={Link} to="/explore">
        <IconButton size="large">
          <ExploreOutlinedIcon
            style={{
              color: "rgba(0, 0, 0, 0.54)",
            }}
          />
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem component={Link} to="/create">
        <IconButton size="large">
          <AddAPhotoOutlinedIcon
            style={{
              color: "rgba(0, 0, 0, 0.54)",
            }}
          />
        </IconButton>
        <p>Add Post</p>
      </MenuItem>
      <MenuItem component={Link} to="#">
        <IconButton size="large">
          <Badge
            badgeContent={4}
            color="secondary"
            style={{
              color: "rgba(0, 0, 0, 0.54)",
            }}
          >
            <AllInboxOutlinedIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem component={Link} to="#">
        <IconButton size="large">
          <Badge badgeContent={6} color="secondary">
            <NotificationsActiveOutlinedIcon
              style={{
                color: "rgba(0, 0, 0, 0.54)",
              }}
            />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem component={Link} to="/profile">
        <IconButton size="large">
          <AccountCircleOutlinedIcon
            style={{
              color: "rgba(0, 0, 0, 0.54)",
            }}
          />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={handleLogOut}>
        <IconButton size="large">
          <ExitToAppOutlinedIcon
            style={{
              color: "rgba(0, 0, 0, 0.54)",
            }}
          />
        </IconButton>
        <p>LogOut</p>
      </MenuItem>
    </Menu>
  );
  const modalBody = (
    <Grid sx={modalStyle}>
      <Grid container sx={theme.search} style={{ margin: "0px auto" }}>
        <Grid item xs={10}>
          <InputBase
            placeholder=" Search…"
            // sx={{
            // 	root: theme.inputRoot,
            // 	input: theme.inputInput,
            // }}
            sx={{ paddingTop: "4px", paddingLeft: "16px" }}
            inputProps={{ "aria-label": "search" }}
            onChange={(e) => findUser(e.target.value)}
          />
        </Grid>
        <Grid item xs={2} sx={theme.searchIcon}>
          <SearchOutlinedIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
        </Grid>
      </Grid>
      <List sx={{ width: "100%" }}>
        {search.user
          ? search.user.map((item) => {
              return (
                <>
                  <Link
                    style={{ textDecoration: "none" }}
                    key={item._id}
                    to={
                      item._id !== user._id
                        ? `/profile/${item._id}`
                        : "/profile"
                    }
                    onClick={handleCloseModal}
                  >
                    <Divider
                      variant="inset"
                      component="li"
                      style={{ marginLeft: "0px" }}
                    />
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.Name}
                        secondary={<Typography>{item.Email}</Typography>}
                      />
                    </ListItem>
                  </Link>
                </>
              );
            })
          : null}
      </List>
    </Grid>
  );

  //Switch color modes
  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
      width: 32,
      height: 32,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  return (
    <>
      {/* <nav> */}
      <Grid /*sx={{ flexGrow: 1 }}*/>
        <AppBar
          position="fixed"
          enableColorOnDark={true}
          sx={{
            background: darkMode
              ? "rgba(225, 228, 230, 1)"
              : theme.palette.common.white,
          }}
        >
          <Toolbar sx={{ justifyContent: "space-around" }}>
            <Link to={user ? "/" : "/login"} style={{ textDecoration: "none" }}>
              <Typography sx={theme.title} variant="h4" noWrap>
                TopGram
              </Typography>
            </Link>
            <Grid sx={{ flexGrow: 1 }} />
            <Grid sx={theme.sectionDesktop}>
              <BottomNavigation sx={{ background: "transparent" }}>
                <BottomNavigationAction
                  label="Search"
                  value="search"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleOpenModal}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  icon={
                    <SearchOutlinedIcon
                      style={{ color: "rgba(0, 0, 0, 0.54)" }}
                    />
                  }
                />
                <BottomNavigationAction
                  label="Home"
                  value="home"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => history("/")}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  icon={
                    <HomeOutlinedIcon
                      style={{
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    />
                  }
                />
                <BottomNavigationAction
                  label="Explore"
                  value="explore"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => history("/explore")}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  icon={
                    <ExploreOutlinedIcon
                      style={{
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    />
                  }
                />

                <BottomNavigationAction
                  label="Add Post"
                  value="add post"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => history("/create")}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  icon={
                    <AddAPhotoOutlinedIcon
                      style={{
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    />
                  }
                />
                <BottomNavigationAction
                  label="Messages"
                  value="messages"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => history("/messages")}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  icon={
                    <Badge
                      badgeContent={4}
                      color="primary"
                      style={{
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    >
                      <AllInboxOutlinedIcon />
                    </Badge>
                  }
                />
                <BottomNavigationAction
                  label="Notifications"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  value="notification"
                  icon={
                    <Badge badgeContent={6} color="primary">
                      <NotificationsActiveOutlinedIcon
                        style={{
                          color: "rgba(0, 0, 0, 0.54)",
                        }}
                      />
                    </Badge>
                  }
                />
                <BottomNavigationAction
                  label="Profile"
                  value="profile"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => history("/profile")}
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  icon={
                    <AccountCircleOutlinedIcon
                      style={{
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    />
                  }
                />
                <BottomNavigationAction
                  label="Logout"
                  style={{ color: "rgba(0, 0, 0, 0.54)" }}
                  value="logout"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={handleLogOut}
                  icon={
                    <ExitToAppOutlinedIcon
                      style={{
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    />
                  }
                />
                <BottomNavigationAction
                  label="color-modes"
                  style={{ paddingTop: "27px" }}
                  value="color-modes"
                  component={motion.button}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => handleDarkMode()}
                  icon={<MaterialUISwitch sx={{ m: 1 }} checked={darkMode} />}
                />
              </BottomNavigation>
            </Grid>
            <Grid sx={theme.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
                size="large"
              >
                <MoreIcon style={{ color: "rgba(0, 0, 0, 0.54)" }} />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
      </Grid>
      <Modal open={openModal} onClose={handleCloseModal}>
        {modalBody}
      </Modal>
      {/* </nav> */}
    </>
  );
};

export default Navbar;
