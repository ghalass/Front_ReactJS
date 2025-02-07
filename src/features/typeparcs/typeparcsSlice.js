import { createSlice } from "@reduxjs/toolkit";
import { createSite, deleteSite, fetchSites, updateSite } from "./typeparcsApi";


const initialState = {
    typeparcs: [],
    isLoading: false,
    isProcessing: false,
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
}

const typeparcsSlice = createSlice({
    name: 'typeparcs',
    initialState,
    reducers: {
        resetErrors: (state) => { state.error = null },
    },
    extraReducers: (builder) => {
        builder
            // Fetch typeparcs
            .addCase(fetchSites.pending, (state) => {
                state.isLoading = true;
                state.status = 'loading';
            }).addCase(fetchSites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.typeparcs = action.payload
                state.error = null; // Clear error on successful fetch
            }).addCase(fetchSites.rejected, (state, action) => {
                state.isLoading = false;
                state.status = 'failed';
                state.error = action.payload; // Save error message
            })
            // Create site
            .addCase(createSite.pending, (state) => {
                state.isProcessing = true;
                // state.status = 'loading';
            }).addCase(createSite.fulfilled, (state, action) => {
                state.isProcessing = false;
                // state.status = 'succeeded';
                state.typeparcs.push(action.payload.typeparc)
                state.error = null; // Clear error on successful update
            }).addCase(createSite.rejected, (state, action) => {
                state.isProcessing = false;
                // state.status = 'failed';
                state.error = action.payload; // Save error message
            })
            // Update site
            .addCase(updateSite.pending, (state, action) => {
                state.isProcessing = true;
                state.status = 'loading';
            })
            .addCase(updateSite.fulfilled, (state, action) => {
                const index = state.typeparcs.findIndex((typeparc) => typeparc.id === action.payload.id);
                if (index !== -1) {
                    state.typeparcs[index] = action.payload;
                }
                state.error = null; // Clear error on successful update
                state.isProcessing = false;
                state.status = 'succeeded';
            }).addCase(updateSite.rejected, (state, action) => {
                state.isProcessing = false;
                state.status = 'failed';
                // console.log(action.payload);
                state.error = action.payload; // Save error message
            })
            // Delete site
            .addCase(deleteSite.pending, (state, action) => {
                state.isProcessing = true;
                state.status = 'loading';
            })
            .addCase(deleteSite.fulfilled, (state, action) => {
                state.typeparcs = state.typeparcs.filter((typeparc) => typeparc.id !== action.payload);
                state.error = null;
                state.isProcessing = false;
                state.status = 'succeeded';
            })
            .addCase(deleteSite.rejected, (state, action) => {
                state.isProcessing = false;
                state.status = 'failed';
                state.error = action.payload; // Save error message
            });;
    },
})

export const { resetErrors } = typeparcsSlice.actions;

export default typeparcsSlice.reducer;