import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Followers: [],
    Following: []
}

export const updateFollowDataSlice = createSlice({
    name: "followData",
    initialState,
    reducers: {
       updateFollowData: (state, action) => {
           console.log("State:", state, action)
           state.Followers = action.payload.Followers;
           state.Following = action.payload.Following
       }
    }
})

export const { updateFollowData } = updateFollowDataSlice.actions;

export default updateFollowDataSlice.reducer;