import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../components/counter/CounterSlice';
import postsReducer from '../components/posts/PostsSlice';
import sitesReducer from '../features/sites/sitesSlice';

export const storeApp = configureStore({
    reducer: {
        counterData: counterReducer,
        postsData: postsReducer,
        sites: sitesReducer,
    },
    devTools: true
})