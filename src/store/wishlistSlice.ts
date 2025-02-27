import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./productSlice";

const initialState: Product[] = [];

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: initialState,
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                state.items = state.items.filter((item) => item.id !== action.payload.id);
                return;
            }
            state.items.push(action.payload);
        }
    },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;