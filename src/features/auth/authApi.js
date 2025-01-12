import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../utils/constants";

// Define the base URL for your API
const API_URL = `${API}`;

// Login Auth
export const loginAuth = createAsyncThunk('auth/loginAuth', async (userData, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        const data = response.data;
        if (!data?.errors) {
            localStorage.setItem('token', data.token);
        };

        return response.data;

    } catch (error) {
        // console.log(error);
        // return rejectWithValue(error.response?.data.message || error.message);
        return rejectWithValue(error.response?.data || error);
    }
});

// Logout Auth
export const logoutAuth = createAsyncThunk('auth/logoutAuth', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${API_URL}/logout`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        localStorage.removeItem('token')
        // if (!data?.errors) localStorage.setItem('token', data.token);

        return response;

    } catch (error) {
        // console.log(error);
        // return rejectWithValue(error.response?.data.message || error.message);
        return rejectWithValue(error.response?.data || error);
    }
});

// GET USER
export const userAuth = createAsyncThunk('auth/userAuth', async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${API_URL}/user`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        console.log(res.data);
        return res.data
    } catch (error) {
        // console.log(error);
        return rejectWithValue(error.response?.data || error);
    }
})


