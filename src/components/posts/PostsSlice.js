import { createSlice } from "@reduxjs/toolkit";
import { getAllposts } from "./postsApi";


const initialState = {
    posts: [],
    isLoading: false,
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllposts.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(getAllposts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.posts.push(action.payload)
        }).addCase(getAllposts.rejected, (state, action) => {
            state.isLoading = false;
            state.posts.push(action.payload)
        })
    },
})

export default postsSlice.reducer;