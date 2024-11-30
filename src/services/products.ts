import { ProductItem } from "./types";

export default class ProductService {
  static fetchAllProducts = async (): Promise<ProductItem[]> => {
    const dataRes = await fetch("https://fakestoreapi.com/products");
    const data = dataRes.json();
    return data;
  };
}
