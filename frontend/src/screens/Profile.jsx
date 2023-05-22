
import React, { useEffect, useState, /*useContext*/ } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
// import AuthenticationContext from "../contexts/auth/Auth.context";
import VerticalTabs from "../components/VerticalTabs.jsx";
import Navbar from "../components/Navbar";
// import { MY_POST_URL, MY_BOOKMARKS_URL } from "../service/apiCalls";
import {useSelector, useDispatch} from 'react-redux';

// Material-UI Components
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import Avatar from "@mui/material/Avatar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MuiDialogContent from "@mui/material/DialogContent";
import MuiDialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/styles";

// Material-UI Icons
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchMyPostsAction } from "../lib/actionReducerSlice/fetchMyPostsSlice";
import { useTheme } from "@mui/system";
import { fetchMyBookmarksAction } from "../lib/actionReducerSlice/fetchMyBookmarksSlice";

// EditProfile dialog content style
const DialogContent = styled(MuiDialogContent)((theme) => ({
	root: {
		padding: "16px",
	},
}));

// EditProfile dialog actions style
const DialogActions = styled(MuiDialogActions)((theme) => ({
	root: {
		margin: "0px",
		padding: "2px",
	},
}));

// Tabs data container
const TabPanel = (props) => {
	const { children, value, index, ...other } = props;
	return (
		<div role="tabpanel" hidden={value !== index} {...other}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

const ProfilePage = () => {
    const theme = useTheme();
	// const { state } = useContext(AuthenticationContext);
	const [data, setData] = useState([]);
    const dispatch = useDispatch();
	const [bookmarks, setBookmarks] = useState([]);
	const [value, setValue] = useState("Posts");
    const postsData = useSelector((state) => state.myPosts);
    const myBookmarks = useSelector((state) => state.myBookmarks);
    const user = JSON.parse(localStorage?.getItem('user'));

	// const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(() => {
		// axios.get(MY_POST_URL, config).then((res) => {
		// 	setData(res.data.posts);
		// });
		// axios.get(MY_BOOKMARKS_URL, config).then((res) => {
		// 	setBookmarks(res.data.bookmark);
		// });
        // MY_POST_URL().then((res) => {
        //     console.log("Res:", res)
		// 	setData(res.data.posts);
		// });
        dispatch(fetchMyPostsAction());
        dispatch(fetchMyBookmarksAction());
    
		// MY_BOOKMARKS_URL().then((res) => {
		// 	setBookmarks(res?.data?.bookmark);
		// });
	}, [dispatch]);

    // Set Data from API after dispatching
    useEffect(() => {
        setData(postsData?.data?.posts);
    }, [postsData])

    useEffect(() => {
        setBookmarks(myBookmarks?.data?.bookmark);
    }, [myBookmarks])

	//Toggle the EditProfile Button to show the Dialog
	const [openEdit, setOpenEdit] = useState(false);

	const handleEditClickOpen = () => {
		setOpenEdit(true);
	};
	const handleEditClose = () => {
		setOpenEdit(false);
	};

	return <>
        <Navbar />
        <CssBaseline />
        <Box component="main" sx={{
            maxWidth: 935,
            margin: "auto",
            padding: "100px 20px 0",
        }}>
            {/* User Profile Data Goes Here */}
            <Box mb="44px">
                <Grid container>
                    <Grid item xs={4} sx={{ margin: "auto" }}>
                        <Avatar
                            sx={{ width: 152, height: 152, margin: "auto" }}
                            src={""}
                            alt={"Remy Sharp"}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Box clone mb="20px">
                            <Grid container alignItems="center">
                                <Typography variant="h5">
                                    {/* {state ? state.user.Name : "IsLoading ..."} */}
                                    {user?.Name}
                                </Typography>
                                <Button
                                    sx={{ marginLeft: 20 }}
                                    variant="outlined"
                                    onClick={handleEditClickOpen}
                                >
                                    Edit Profile
                                </Button>
                                <IconButton component={Link} to="#" size="large">
                                    <Icon>settings</Icon>
                                </IconButton>
                            </Grid>
                        </Box>
                        <Box mb="20px">
                            <Grid container spacing={4}>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>{data?.length}</b> posts
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>
                                            {user
                                                ? user.Followers.length
                                                : "IsLoading ..."}
                                        </b>{" "}
                                        followers
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <b>
                                            {user
                                                ? user.Following.length
                                                : "IsLoading ..."}
                                        </b>{" "}
                                        following
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                        <Typography variant="subtitle1">Siriwat Kunaporn</Typography>
                        <Typography variant="subtitle1">Bangkok Christian College</Typography>
                        <Typography variant="subtitle1">CU intania 96.</Typography>
                    </Grid>
                </Grid>
            </Box>
            {/* Tabs Goes Reference Here */}
            <Tabs
                value={value}
                centered
                onChange={(event, value) => {
                    setValue(value);
                }}
                TabIndicatorProps={{
                    style: {
                        transform: "translateY(-70px)",
                        backgroundColor: "#262626",
                    },
                }}
            >
                <Tab label="Posts" value="Posts" icon={<Icon>grid_on_outlined</Icon>} />
                <Tab label="IGTV" value="IGTV" icon={<Icon>live_tv</Icon>} disabled />
                <Tab label="Saved" value="Saved" icon={<Icon>bookmark_border_outlined</Icon>} />
                <Tab
                    label="Tagged"
                    value="Tagged"
                    icon={<Icon>local_offer_outlined</Icon>}
                    disabled
                />
            </Tabs>
            {/* Tabs Data Goes Here */}
            <TabPanel value={value} index="Posts">
                <Grid container spacing={2}> 
                    {data?.map((item) => (
                        <Grid item xs={4} key={item.id} sx={{ width: "100%", height: "100%" }}>
                            <img
                                width="100%"
                                height="100%"
                                alt="post"
                                src={`data:${item.photoType};base64,${item.photo}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </TabPanel>
            <TabPanel value={value} index="Saved">
                <ImageList cellHeight={230} cols={3} spacing={15}>
                    {bookmarks?.map((item) => (
                        <ImageListItem key={item._id}>
                            <img
                                src={`data:${item.PhotoType};base64,${item.Photo}`}
                                alt={item.Title}
                            />
                            <ImageListItemBar
                                title={item.Title}
                                subtitle={<span>By : {item.PostedBy.Name}</span>}
                                actionIcon={
                                    <IconButton aria-label={`info about`} sx={{ color: "rgba(255, 255, 255, 0.54)" }} size="large">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </TabPanel>
        </Box>
        {/* EditProfile Dialog */}
        <Dialog onClose={handleEditClose} open={openEdit} sx={theme.dialogContainer}>
            <DialogTitle sx={{
                margin: "0px",
                padding: "16px",
            }}>
                <Typography variant="h6">Profile settings</Typography>
                <IconButton
                    aria-label="close"
                    sx={{ 
                        position: "absolute",
                        right: "8px",
                        top: "8px",
                        color: "#9e9e9e",
                    }}
                    onClick={handleEditClose}
                    size="large">
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <VerticalTabs />
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleEditClose} color="primary">
                    Save changes
                </Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default ProfilePage;
