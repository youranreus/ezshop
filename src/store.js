import { configureStore } from "@reduxjs/toolkit";
import queryreducer from "./slice/querySlice";

export default configureStore({
    reducer: {
        query: queryreducer
    }
})