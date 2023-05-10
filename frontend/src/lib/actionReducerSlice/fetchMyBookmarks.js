import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMyBookmarks } from "../config/backendAPI";

export const fetchMyBookmarksAction = createAsyncThunk('fetchMyBookmarksInfo', async() => {
    const response = await fetchMyBookmarks();
    return response.json();
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