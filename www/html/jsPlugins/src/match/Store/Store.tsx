import { configureStore } from "@reduxjs/toolkit";
import tabMatchReducer from "../Slice/TabMatchSlice";

export const Store = configureStore({
    reducer: {
        tabMatch: tabMatchReducer,
    },
});