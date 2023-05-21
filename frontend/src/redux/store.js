import { configureStore } from "@reduxjs/toolkit";
import fetchMyPostsSliceReducer from "../lib/actionReducerSlice/fetchMyPostsSlice";
import fetchMyBookmarkSliceReducer from "../lib/actionReducerSlice/fetchMyBookmarksSlice";
import updateFollowDataSliceReducer from "../lib/actionReducerSlice/updateFollowDataSlice";

export const store = configureStore({
    reducer: {
        myPosts:  fetchMyPostsSliceReducer,
        myBookmarks: fetchMyBookmarkSliceReducer,
        followData: updateFollowDataSliceReducer
    }
})