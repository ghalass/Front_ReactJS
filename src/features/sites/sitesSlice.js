import { createSlice } from "@reduxjs/toolkit";
import { createSite, deleteSite, fetchSites, updateSite } from "./sitesApi";


const initialState = {
    sites: [],
    isLoading: false,
    isProcessing: false,
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
}

const sitesSlice = createSlice({
    name: 'sites',
    initialState,
    reducers: {
        resetErrors: (state) => { state.error = null },
    },
    extraReducers: (builder) => {
        builder
            // Fetch sites
            .addCase(fetchSites.pending, (state) => {
                state.isLoading = true;
                state.status = 'loading';
            }).addCase(fetchSites.fulfilled, (state, action) => {
                state.isLoading = false;
                state.status = 'succeeded';
                state.sites = action.payload
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
                state.sites.push(action.payload.site)
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
                const index = state.sites.findIndex((site) => site.id === action.payload.id);
                if (index !== -1) {
                    state.sites[index] = action.payload;
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
                state.sites = state.sites.filter((site) => site.id !== action.payload);
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

export const { resetErrors } = sitesSlice.actions;

export default sitesSlice.reducer;