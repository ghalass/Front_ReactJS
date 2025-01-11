import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://jsonplaceholder.typicode.com/posts";

export const getAllposts = createAsyncThunk('posts/getAll', async () => {
    const res = await axios.get(url, {
        timeout: 10 * 1000,
        headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });
    return res.data
})