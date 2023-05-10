import { configureStore } from "@reduxjs/toolkit";
import cocktailSlice from "./cocktailSlice";

export default configureStore ({
    reducer:{
        cocktailSlice,
    }
})