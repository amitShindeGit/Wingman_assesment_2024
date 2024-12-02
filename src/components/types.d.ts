import { ProductItem } from "../services/types";

export interface CardProps {
  product: ProductItem;
}

export interface SearchInputProps {
  placeHolderText?: string;
  value: string;
  handleChange: (value: string) => void;
}

export interface GetFilteredAndSortedProductsProps {
  products?: ProductItem[];
  searchInput: string;
  sort: {
    sortBy: string;
    order: "asc" | "desc" | "";
  };
}
