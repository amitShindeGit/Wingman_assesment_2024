import { ProductItem } from "../services/types";

export interface CardProps {
  product: ProductItem;
}

export interface SearchInputProps {
  placeHolderText?: string;
  handleChange: (value: string) => void;
}
