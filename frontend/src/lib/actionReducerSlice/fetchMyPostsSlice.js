import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { MY_POST_URL } from "../../service/apiCalls";

//Fetch my posts
export const fetchMyPostsAction = createAsyncThunk('fetchMyPostsAction', async() => {
    const response = await MY_POST_URL();
    console.log("RESPONSE SLICE:", response)
    return response;
}) 

const fetchMyPostsSlice = createSlice({
    name: 'fetchMyPostsInfo',
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMyPostsAction.pending, (state, action) => {
            console.log("Check Payload in pending:", action)
            state.isLoading = true;
        })
        builder.addCase(fetchMyPostsAction.fulfilled, (state, action) => {
            console.log("Check Payload is fulfilled:", action)
            state.isLoading = false;
            state.data = action.payload?.data;
        })
        builder.addCase(fetchMyPostsAction.rejected, (state, action) => {
            state.isError = true;
        })
    }
})

export default fetchMyPostsSlice.reducer;