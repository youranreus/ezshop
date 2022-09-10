import { configureStore } from "@reduxjs/toolkit";
import queryreducer from "./slice/querySlice";
import userreducer from "./slice/userSlice";

export default configureStore({
    reducer: {
        query: queryreducer,
        user: userreducer
    }
})