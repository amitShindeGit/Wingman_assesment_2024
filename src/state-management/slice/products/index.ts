import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../../services/types";

interface ProductState {
  products: ProductItem[] | null;
}

const initialState: ProductState = {
  products: null,
};

export const productSlice = createSlice({
  initialState,
  name: "productsState",
  reducers: {
    addProducts: (state, action: PayloadAction<ProductItem[]>) => {
      state.products = state.products?.length
        ? [...state.products, ...action.payload]
        : [...action.payload];
    },
    filterByName: (state) => {
      state.products = [];
    },
  },
});

export const { addProducts, filterByName } = productSlice.actions;

export default productSlice.reducer;
