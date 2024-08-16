import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./order/orderSlice"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
    reducer: {
        order: orderReducer
    }
})
