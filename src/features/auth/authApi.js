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
            localStorage.setItem('ACCESS_TOKEN', data.token);

            const expiresInMinutes = 60;
            const expiresAt = new Date().getTime() + expiresInMinutes * 60 * 1000;
            console.log(expiresAt);

            localStorage.setItem('ACCESS_TOKEN_EXPIRATION', JSON.stringify(expiresAt));
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
                authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            }
        });
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('ACCESS_TOKEN_EXPIRATION')
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
                Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
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


