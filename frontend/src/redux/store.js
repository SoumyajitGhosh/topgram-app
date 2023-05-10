import { configureStore } from "@reduxjs/toolkit";
import fetchMyPostsSliceReducer from "../lib/actionReducerSlice/fetchMyPostsSlice";
// import fetchMyBookmarksSlice from "./fetchMyBookmarks";

export const store = configureStore({
    reducer: {
        myPosts:  fetchMyPostsSliceReducer,
        // myBookmarks: fetchMyBookmarksSlice
    }
})