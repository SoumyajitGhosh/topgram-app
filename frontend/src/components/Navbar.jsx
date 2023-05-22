import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";

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
import { Grid } from "@mui/material";
import { motion } from 'framer-motion/dist/framer-motion';
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

const Navbar = () => {
	const history = useNavigate();
	const theme = useTheme();
	const [search, setSearch] = useState([]);
	const user = JSON.parse(localStorage?.getItem('user'));

	// Material-Ui
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	// getModalStyle is not a pure function, we roll the style only on the first render
	const modalStyle = () =>{
		return {
			top: `0%`,
			left: `30%`,
			// transform: `translate(50%, 50%)`,
			border: "1px solid rgba(0, 0, 0, 0.015)",
			position: "absolute",
			width: 400,
			backgroundColor: theme.palette.background.paper,
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
					<SearchOutlinedIcon style={{ "color": "rgba(0, 0, 0, 0.54)" }} />
				</IconButton>
				<p>Search</p>
			</MenuItem>
			<MenuItem component={Link} to="/explore">
				<IconButton size="large">
					<ExploreOutlinedIcon
						style={{
							"color": "rgba(0, 0, 0, 0.54)",
						}}
					/>
				</IconButton>
				<p>Explore</p>
			</MenuItem>
			<MenuItem component={Link} to="/create">
				<IconButton size="large">
					<AddAPhotoOutlinedIcon
						style={{
							"color": "rgba(0, 0, 0, 0.54)",
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
							"color": "rgba(0, 0, 0, 0.54)",
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
								"color": "rgba(0, 0, 0, 0.54)",
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
							"color": "rgba(0, 0, 0, 0.54)",
						}}
					/>
				</IconButton>
				<p>Profile</p>
			</MenuItem>
			<MenuItem onClick={handleLogOut}>
				<IconButton size="large">
					<ExitToAppOutlinedIcon
						style={{
							"color": "rgba(0, 0, 0, 0.54)",
						}}
					/>
				</IconButton>
				<p>LogOut</p>
			</MenuItem>
		</Menu>
	);
	const modalBody = (
		<Grid sx={modalStyle}>
			<Grid container sx={theme.search} style={{ "margin": "0px auto" }}>
				<Grid item xs={10}>
					<InputBase
						placeholder=" Search…"
						// sx={{
						// 	root: theme.inputRoot,
						// 	input: theme.inputInput,
						// }}
						sx= {{ paddingTop: '4px', paddingLeft: '16px' }}
						inputProps={{ "aria-label": "search" }}
						onChange={(e) => findUser(e.target.value)}
					/>
				</Grid>
				<Grid item xs={2} sx={theme.searchIcon}>
					<SearchOutlinedIcon style={{ "color": "rgba(0, 0, 0, 0.54)" }} />
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
									to={item._id !== user._id ? `/profile/${item._id}` : "/profile"}
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
											secondary={
												<Typography>{item.Email}</Typography>
											}
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

	return (
		<>
        {/* <nav> */}
			<Grid /*sx={{ flexGrow: 1 }}*/>
				<AppBar position="fixed" sx={{ backgroundColor: "#ffffff" }}>
					<Toolbar sx={{ justifyContent: 'space-around' }}>
						<Link to={user ? "/" : "/login"} style={{ textDecoration: 'none' }}>
							<Typography sx={theme.title} variant="h4" noWrap>
								TopGram
							</Typography>
						</Link>
						<Grid sx={{ flexGrow: 1 }} />
						<Grid sx={theme.sectionDesktop}>
							<BottomNavigation>
								<BottomNavigationAction
									label="Search"
									value="search"
									component={motion.button}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.8 }}
									onClick={handleOpenModal}
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									icon={
										<SearchOutlinedIcon
											style={{ "color": "rgba(0, 0, 0, 0.54)" }}
										/>
									}
								/>
								<BottomNavigationAction
									label="Home"
									value="home"
									component={motion.button}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.8 }}
									onClick={()=> history('/')}
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									icon={
										<HomeOutlinedIcon
											style={{
												"color": "rgba(0, 0, 0, 0.54)",
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
									onClick={()=> history('/explore')}
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									icon={
										<ExploreOutlinedIcon
											style={{
												"color": "rgba(0, 0, 0, 0.54)",
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
									onClick={()=> history('/create')}
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									icon={
										<AddAPhotoOutlinedIcon
											style={{
												"color": "rgba(0, 0, 0, 0.54)",
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
									onClick={()=> history('/messages')}
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									icon={
										<Badge
											badgeContent={4}
											color="secondary"
											style={{
												"color": "rgba(0, 0, 0, 0.54)",
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
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									value="notification"
									icon={
										<Badge badgeContent={6} color="secondary">
											<NotificationsActiveOutlinedIcon
												style={{
													"color": "rgba(0, 0, 0, 0.54)",
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
									onClick={()=> history('/profile')}
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									icon={
										<AccountCircleOutlinedIcon
											style={{
												"color": "rgba(0, 0, 0, 0.54)",
											}}
										/>
									}
								/>
								<BottomNavigationAction
									label="Logout"
									style={{ "color": "rgba(0, 0, 0, 0.54)" }}
									value="logout"
									component={motion.button}
									whileHover={{ scale: 1.2 }}
									whileTap={{ scale: 0.8 }}
									onClick={handleLogOut}
									icon={
										<ExitToAppOutlinedIcon
											style={{
												"color": "rgba(0, 0, 0, 0.54)",
											}}
										/>
									}
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
                                size="large">
								<MoreIcon style={{ "color": "rgba(0, 0, 0, 0.54)" }} />
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
