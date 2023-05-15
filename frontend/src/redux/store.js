import { configureStore } from "@reduxjs/toolkit";
import fetchMyPostsSliceReducer from "../lib/actionReducerSlice/fetchMyPostsSlice";
import fetchMyBookmarkSliceReducer from "../lib/actionReducerSlice/fetchMyBookmarksSlice";

export const store = configureStore({
    reducer: {
        myPosts:  fetchMyPostsSliceReducer,
        myBookmarks: fetchMyBookmarkSliceReducer
    }
})