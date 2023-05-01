import apiRequest from "./request";
import { config } from "./request";

//Get user data
const GET_USER_DATA = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/user/${payload.userid}`,
        method: "GET",
        headers: config()
    })
}

// Create a Post Screen
const CREATE_POST_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/createpost`,
        method: "POST",
        data: payload,
        headers: config()
    })
}

// Home Screen
const ALL_POST_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/allpost`,
        method: "GET",
        params: payload,
        headers: config()
    })
}

// Login Screen
const LOGIN_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/signin`,
        method: "POST",
        data: payload
    })
}

// Profile Screen
const MY_POST_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/mypost`,
        method: "GET",
        params: payload,
        headers: config()
    })
}
const MY_BOOKMARKS_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/bookmarks`,
        method: "GET",
        params: payload,
        headers: config()
    })
}

// ResetPassword Screen
const RESET_PWD_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/reset-pwd`,
        method: "POST",
        data: payload
    })
}

// SignUp Screen
const SIGNUP_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/signup`,
        method: "POST",
        data: payload
    })
}

// SubscribePosts Screen
const SUB_POST_URL = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:8585/subspost`,
        method: "GET",
        params: payload,
        headers: config()
    })
}

// Follow user
const FOLLOW_USER = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/follow`,
        method: "PUT",
        data: payload,
        headers: config()
    })
}

// Unfollow user
const UNFOLLOW_USER = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/unfollow`,
        method: "PUT",
        data: payload,
        headers: config()
    })
}

// Like Posts
const LIKE_POSTS = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/like`,
        method: "PUT",
        data: payload,
        headers: config()
    })
}

// Unlike Posts
const UNLIKE_POSTS = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/Unlike`,
        method: "PUT",
        data: payload,
        headers: config()
    })
}

// Add a comment
const ADD_COMMENT= (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/comment`,
        method: "PUT",
        data: payload,
        headers: config()
    })
}

// Delete Posts
const DELETE_POSTS = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/deletepost/${payload.postId}`,
        method: "DELETE",
        headers: config()
    })
}

// Remove Bookmark
const REMOVE_BOOKMARK = (payload) => {
    return apiRequest({
        endpoint: `http://localhost:5000/remove-bookmark`,
        method: "PUT",
        data: payload,
        headers: config()
    })
}

export { GET_USER_DATA, CREATE_POST_URL, ALL_POST_URL, LOGIN_URL, MY_POST_URL, MY_BOOKMARKS_URL, RESET_PWD_URL, SIGNUP_URL, SUB_POST_URL, FOLLOW_USER, UNFOLLOW_USER, LIKE_POSTS, UNLIKE_POSTS, ADD_COMMENT, DELETE_POSTS, REMOVE_BOOKMARK }