import { createSlice } from "@reduxjs/toolkit";
import { loginAuth, logoutAuth, userAuth } from "./authApi";


const initialState = {
    user: null,
    isProcessing: false,
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
    token: null
}

const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetErrors: (state) => { state.error = null },
    },
    extraReducers: (builder) => {
        builder
            // loginAuth
            .addCase(loginAuth.pending, (state) => {
                state.isProcessing = true;

            }).addCase(loginAuth.fulfilled, (state, action) => {
                state.isProcessing = false;
                state.status = 'succeeded';
                console.log(action.payload);

                state.token = action.payload.token
                state.user = action.payload
                state.error = null; // Clear error on successful fetch
            }).addCase(loginAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.isProcessing = false;
                state.error = action.payload; // Save error message
            })

            // logoutAuth
            .addCase(logoutAuth.pending, (state) => {
                state.isProcessing = true;
            }).addCase(logoutAuth.fulfilled, (state, action) => {
                state.isProcessing = false;
                state.status = 'succeeded';
                state.user = action.payload
                state.error = null; // Clear error on successful fetch
            }).addCase(logoutAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.isProcessing = false;
                state.error = action.payload; // Save error message
            })

            // getUSER
            .addCase(userAuth.pending, (state) => {
                state.isProcessing = true;
            }).addCase(userAuth.fulfilled, (state, action) => {
                state.isProcessing = false;
                state.status = 'succeeded';

                // state.token = action.payload.token
                state.user = action.payload
                state.error = null; // Clear error on successful fetch
            }).addCase(userAuth.rejected, (state, action) => {
                state.status = 'failed';
                state.isProcessing = false;
                state.error = action.payload; // Save error message
            });
    },
})

export const { resetErrors } = authSlice.actions;

export default authSlice.reducer;