import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductItem } from "../../../services/types";

interface ProductsPayload {
  products?: ProductItem[];
  searchInput: string;
  sort: {
    sortBy: string;
    order: "asc" | "desc" | "";
  };
}

const initialState: ProductsPayload = {
  products: [],
  searchInput: "",
  sort: {
    sortBy: "",
    order: "",
  },
};

export const productSlice = createSlice({
  initialState,
  name: "productsState",
  reducers: {
    addProducts: (state, action: PayloadAction<ProductsPayload>) => {
      return {
        ...state,
        products: action.payload.products,
      };
    },
    addSearchFilter: (state, action: PayloadAction<ProductsPayload>) => {
      return {
        ...state,
        searchInput: action.payload?.searchInput,
      };
    },
    sortProducts: (state, action: PayloadAction<ProductsPayload>) => {
      const sortOrder = action?.payload?.sort?.order;
      const sortBy = action?.payload?.sort?.sortBy;

      switch (sortOrder) {
        case "asc": {
          return {
            ...state,
            sort: {
              sortBy: sortBy,
              order: sortOrder,
            },
          };
        }

        case "desc": {
          return {
            ...state,
            sort: {
              sortBy: sortBy,
              order: sortOrder,
            },
          };
        }

        default:
          return {
            ...state,
            sort: {
              sortBy: "",
              order: "",
            },
          };
      }
    },
  },
});

export const { addProducts, addSearchFilter, sortProducts } =
  productSlice.actions;

export default productSlice.reducer;
