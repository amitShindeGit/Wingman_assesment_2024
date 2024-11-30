import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../../services/types";

interface ProductState {
  products: ProductItem[];
  searchInput: string;
}

interface AddProductsPayload {
  products: ProductItem[];
  searchInput: string;
}

const initialState: ProductState = {
  products: [],
  searchInput: "",
};

export const productSlice = createSlice({
  initialState,
  name: "productsState",
  reducers: {
    addProducts: (state, action: PayloadAction<AddProductsPayload>) => {
      state.products = [...action.payload.products];
    },
    filterProductsByName: (
      state,
      action: PayloadAction<AddProductsPayload>
    ) => {
      const filteredData = action.payload?.products?.filter((product) =>
        product?.title?.includes(action.payload?.searchInput)
      );
      state.products = state.products ? [...filteredData] : [...state.products];
      state.searchInput = action.payload?.searchInput;
    },
  },
});

export const { addProducts, filterProductsByName } = productSlice.actions;

export default productSlice.reducer;
