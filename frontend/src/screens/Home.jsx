
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../contexts/auth/Auth.context";
import { BOOKMARK_POST } from "../contexts/types.jsx";
import Navbar from "../components/Navbar";
import { ADD_BOOKMARK_URL, ADD_COMMENT, ALL_POST_URL, DELETE_POSTS, LIKE_POSTS, REMOVE_BOOKMARK, UNLIKE_POSTS } from "../service/apiCalls";
import {useSelector, useDispatch} from 'react-redux';

// Material-UI deps
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

// Material-UI Icons
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import SendIcon from "@mui/icons-material/Send";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useTheme } from "@mui/system";
import { fetchMyBookmarksAction } from "../lib/actionReducerSlice/fetchMyBookmarksSlice";

const Home = () => {
	const theme = useTheme();
	// const { state, dispatch } = useContext(AuthenticationContext);
	const dispatch = useDispatch();
    const user = JSON.parse(localStorage?.getItem('user'));
	const [data, setData] = useState([]);
	const [showSend, setShowSend] = useState(false);
	const [comment, setComment] = useState("");

	// const config = axiosConfig(localStorage.getItem("jwt"));

	useEffect(() => {
		// axios.get(ALL_POST_URL, config).then((res) => {
		// 	setData(res.data.posts);
		// });
        ALL_POST_URL().then((res) => {
			setData(res.posts);
		});
	}, []);

	const likePost = (id) => {
		// axios.put(`http://localhost:5000/like`, { postId: id }, config)
		// 	.then((result) => {
		// 		const newData = data.map((item) => {
		// 			if (result.data._id === item._id) return result.data;
		// 			else return item;
		// 		});
		// 		setData(newData);
		// 	})
		// 	.catch((err) => console.log(err));
        LIKE_POSTS({ postId: id })
			.then((result) => {
				const newData = data.map((item) => {
					if (result._id === item._id) return result;
					else return item;
				});
				setData(newData);
			})
			.catch((err) => console.log(err));
	};

	const unlikePost = (id) => {
		// axios.put(`http://localhost:5000/Unlike`, { postId: id }, config)
		// 	.then((res) => {
		// 		const newData = data.map((item) => {
		// 			if (res.data._id === item._id) return res.data;
		// 			else return item;
		// 		});
		// 		setData(newData);
		// 	})
		// 	.catch((err) => console.log(err));
        UNLIKE_POSTS({ postId: id })
			.then((res) => {
				const newData = data.map((item) => {
					if (res._id === item._id) return res;
					else return item;
				});
				setData(newData);
			})
			.catch((err) => console.log(err));
	};

	const bookmark = (id) => {
		// axios.put(`http://localhost:5000/bookmark-post`, { postId: id }, config)
		// 	.then((result) => {
		// 		dispatch({
		// 			type: BOOKMARK_POST,
		// 			payload: { Bookmarks: result.data.Bookmarks },
		// 		});
		// 		localStorage.setItem("user", JSON.stringify(result.data));
		// 	})
		// 	.catch((err) => console.log(err));
        ADD_BOOKMARK_URL({ postId: id })
			.then((result) => {
				// dispatch({
				// 	type: BOOKMARK_POST,
				// 	payload: { Bookmarks: result.Bookmarks },
				// });
				dispatch(fetchMyBookmarksAction());
				localStorage.setItem("user", JSON.stringify(result));
				ALL_POST_URL().then((res) => {
					setData(res.posts);
				});
			})
			.catch((err) => console.log(err));
	};

	const removeBookmark = (id) => {
		// axios.put(`http://localhost:5000/remove-bookmark`, { postId: id }, config)
		// 	.then((result) => {
		// 		dispatch({
		// 			type: BOOKMARK_POST,
		// 			payload: { Bookmarks: result.data.Bookmarks },
		// 		});
		// 		localStorage.setItem("user", JSON.stringify(result.data));
		// 	})
		// 	.catch((err) => console.log(err));
        REMOVE_BOOKMARK({ postId: id })
			.then((result) => {
				dispatch(fetchMyBookmarksAction());
				localStorage.setItem("user", JSON.stringify(result));
				ALL_POST_URL().then((res) => {
					setData(res.posts);
				});
			})
			.catch((err) => console.log(err));
	};

	const makeComment = (text, postId) => {
		setComment("");
		// axios.put(`http://localhost:5000/comment`, { text, postId }, config)
		// 	.then((result) => {
		// 		const newData = data.map((item) => {
		// 			if (result.data._id === item._id) return result.data;
		// 			else return item;
		// 		});
		// 		setData(newData);
		// 	})
		// 	.catch((err) => console.log(err));
        ADD_COMMENT({ text, postId })
			.then((result) => {
				const newData = data.map((item) => {
					if (result.data._id === item._id) return result;
					else return item;
				});
				setData(newData);
			})
			.catch((err) => console.log(err));
		setComment("");
	};

	const deletePost = (postId) => {
		// axios.delete(`http://localhost:5000/deletepost/${postId}`, config).then((res) => {
		// 	const newData = data.filter((item) => {
		// 		return item._id !== res.data;
		// 	});
		// 	setData(newData);
		// });
        DELETE_POSTS({postId}).then((res) => {
			const newData = data.filter((item) => {
				return item._id !== res;
			});
			setData(newData);
		});
	};

	return <>
        <Navbar />
        <div style={{ paddingTop: '52px' }}>
            {data.map((item) => (
                <div className="home" key={item._id}>
                    <Card sx={theme.homePageRoot}>
                        <CardHeader
                            sx={{ padding: "10px" }}
                            avatar={
                                <Avatar>
                                    <img
                                        sx={{ height: "40px" }}
                                        alt=""
                                        src={`data:${item.PhotoType};base64,${item.Photo}`}
                                    />
                                </Avatar>
                            }
                            title={
                                <Link
                                    style={{ textDecoration: "none" }}
                                    to={
                                        item.PostedBy._id !== user._id
                                            ? `/profile/${item.PostedBy._id}`
                                            : "/profile"
                                    }
                                >
                                    {item.PostedBy.Name}
                                </Link>
                            }
                            subheader="September 14, 2016"
                        />

                        <CardMedia
                            sx={{ //height: 0,
                                paddingTop: "56.25%", // 16:9
                                height: "max-content" }}
                            image={`data:${item.PhotoType};base64,${item.Photo}`}
                            title="Paella dish"
                        />

                        <CardActions sx={theme.likeBar} disableSpacing>
                            {item.Likes.includes(user._id) ? (
                                <IconButton
                                    aria-label="Like"
                                    color="secondary"
                                    onClick={() => {
                                        unlikePost(item._id);
                                    }}
                                    size="large">
                                    <FavoriteIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="Like"
                                    onClick={() => {
                                        likePost(item._id);
                                    }}
                                    size="large">
                                    <FavoriteBorderIcon />
                                </IconButton>
                            )}
                            <IconButton aria-label="comments" size="large">
                                <ChatBubbleOutlineIcon />
                            </IconButton>
                            {user.Bookmarks.includes(item._id) ? (
                                <IconButton
                                    aria-label="Remove Bookmark"
                                    style={{ marginLeft: "auto", color: "#e0d011" }}
                                    onClick={() => {
                                        removeBookmark(item._id);
                                    }}
                                    size="large">
                                    <BookmarkIcon />
                                </IconButton>
                            ) : (
                                <IconButton
                                    aria-label="Bookmark"
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => {
                                        bookmark(item._id);
                                    }}
                                    size="large">
                                    <BookmarkBorderIcon />
                                </IconButton>
                            )}
                        </CardActions>

                        <CardContent>
                            <Typography variant="subtitle2" display="block" gutterBottom>
                                {item.Likes.length} Likes
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.Body}
                            </Typography>
                        </CardContent>

                        <Divider variant="middle" />

                        <List>
                            {item.Comments.map((cmt) => {
                                return (
                                    <ListItem
                                        sx={{ 
                                            width: "35%",
                                            cursor: "pointer"
                                        }}
                                        alignItems="flex-start"
                                        key={cmt._id}
                                    >
                                        <ListItemText
                                            secondary={
                                                <React.Fragment>
                                                    <Typography
                                                        component="span"
                                                        variant="body2"
                                                        sx={{ 	display: "inline",
                                                        fontWeight: "600" }}
                                                        color="textPrimary"
                                                    >
                                                        <Link
                                                            style={{ textDecoration: "none" }}
                                                            to={
                                                                cmt.PostedBy._id !== user._id
                                                                    ? `/profile/${cmt.PostedBy._id}`
                                                                    : "/profile"
                                                            }
                                                        >
                                                            {cmt.PostedBy.Name}
                                                        </Link>
                                                    </Typography>
                                                    {" — "}
                                                    {cmt.Text}
                                                </React.Fragment>
                                            }
                                        />
                                    </ListItem>
                                );
                            })}
                            {item.Comments.length === 0 ? (
                                <ListItem alignItems="flex-start" style={{ left: "38%" }}>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        No Comments yet
                                    </Typography>
                                </ListItem>
                            ) : null}
                            {item.Comments.length > 3 && item.Comments.length !== 0 ? (
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{ 	width: "35%",
                                    cursor: "pointer" }}
                                >
                                    <Typography variant="caption" display="block" gutterBottom>
                                        See all {item.Comments.length} comments
                                    </Typography>
                                    <DoubleArrowIcon sx={{
                                        height: "17px",
                                        width: "17px",
                                        paddingTop: "4px",
                                        paddingBottom: "3px"
                                    }} />
                                </ListItem>
                            ) : null}
                        </List>

                        <Divider variant="middle" />

                        <CardContent sx={theme.comments}>
                            <Avatar>
                                <img
                                    sx={{ height: "40px" }}
                                    alt=""
                                    src="https://images.unsplash.com/photo-1537815749002-de6a533c64db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                                />
                            </Avatar>
                            <TextField
                                multiline
                                rows={1}
                                placeholder="Add your comment..."
                                variant="outlined"
                                value={comment}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setComment(event.target.value);
                                    setShowSend(true);
                                    if (event.target.value === "") setShowSend(false);
                                }}
                            />
                            <IconButton
                                aria-label="add to favorites"
                                sx={{ height: "17px",
                                width: "17px",
                                paddingTop: "4px",
                                paddingBottom: "3px" }}
                                disabled={!showSend}
                                onClick={() => makeComment(comment, item._id)}
                                size="large">
                                <SendIcon />
                            </IconButton>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    </>;
};

export default Home;
