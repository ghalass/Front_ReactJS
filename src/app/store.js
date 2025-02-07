import { configureStore } from "@reduxjs/toolkit";
import counterReducer from '../components/counter/CounterSlice';
import postsReducer from '../components/posts/PostsSlice';
import sitesReducer from '../features/sites/sitesSlice';
import authReducer from '../features/auth/authSlice';
import typeparcsReducer from '../features/typeparcs/typeparcsSlice';



export const storeApp = configureStore({
    reducer: {
        counterData: counterReducer,
        postsData: postsReducer,
        sites: sitesReducer,
        auth: authReducer,
        typeparcs: typeparcsReducer,
    },
    devTools: true
})

