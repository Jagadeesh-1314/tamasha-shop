import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { Product } from "../../types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const getInitialCart = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem("tamasha-cart");

    if (!savedCart) {
      return [];
    }

    const parsedCart = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart)) {
      return [];
    }

    return parsedCart;
  } catch {
    return [];
  }
};

const initialState: CartState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        // Don't exceed available stock
        if (existingItem.quantity < product.stock) {
          existingItem.quantity += 1;
        }

        return;
      }

      // Don't add an unavailable product
      if (product.stock <= 0) {
        return;
      }

      state.items.push({
        ...product,
        quantity: 1,
      });
    },

    increaseQuantity: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) {
        return;
      }

      if (item.quantity < item.stock) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (
      state,
      action: PayloadAction<number>
    ) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) {
        return;
      }

      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },

    setCart: (
      state,
      action: PayloadAction<CartItem[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;