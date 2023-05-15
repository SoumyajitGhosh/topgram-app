import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MY_BOOKMARKS_URL } from "../../service/apiCalls";

export const fetchMyBookmarksAction = createAsyncThunk('fetchMyBookmarksAction', async() => {
    const response = await MY_BOOKMARKS_URL();
    return response;
})

const fetchMyBookmarksSlice = createSlice({
    name: 'fetchMyBookmarksInfo',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyBookmarksAction.pending, (state, action) => {
            state.isLoading = true;
        })
        builder.addCase(fetchMyBookmarksAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        })
        builder.addCase(fetchMyBookmarksAction.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default fetchMyBookmarksSlice.reducer;