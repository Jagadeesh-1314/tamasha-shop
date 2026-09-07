import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

interface ProductState {
    items: Product[];
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    lastFetched: number | null;
}

const initialState: ProductState = {
    items: [],
    status: "idle",
    error: null,
    lastFetched: null,
};

const productSlice = createSlice({
    name: "products",

    initialState,

    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload;
            state.status = "succeeded";
            state.error = null;
            state.lastFetched = Date.now();
        },

        setLoading: (state) => {
            state.status = "loading";
            state.error = null;
        },

        setError: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.error = action.payload;
        },

        clearProducts: (state) => {
            state.items = [];
            state.status = "idle";
            state.error = null;
            state.lastFetched = null;
        },
    },
});

export const {
    setProducts,
    setLoading,
    setError,
    clearProducts,
} = productSlice.actions;

export default productSlice.reducer;