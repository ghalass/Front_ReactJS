import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/constants";

// Define the base URL for your API
const API_URL = `${API}/typeparcs`;

// Fetch sites from API
export const fetchSites = createAsyncThunk('typeparcs/getAll', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return res.data
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error.response?.data || error);
    }
})

// Create a new site
export const createSite = createAsyncThunk('typeparcs/createSite', async (newSite, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}`, newSite, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        // console.log(error);
        // return rejectWithValue(error.response?.data.message || error.message);
        return rejectWithValue(error.response?.data || error);
    }
})

// Update an existing site
export const updateSite = createAsyncThunk('typeparcs/updatePost', async (updatedSite, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/${updatedSite.id}`, updatedSite, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return response.data;
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error.response?.data || error);
    }
});

// Delete a site
export const deleteSite = createAsyncThunk('typeparcs/deleteSite', async (siteId, { rejectWithValue }) => {
    try {
        await axios.delete(`${API_URL}/${siteId}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        return siteId;
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error.response?.data || error);
    }
});