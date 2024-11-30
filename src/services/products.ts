import { ProductItem } from "./types";

export default class ProductService {
  static fetchNpmPackages = async (): Promise<ProductItem[]> => {
    const dataRes = await fetch("https://fakestoreapi.com/products");
    const data = dataRes.json();
    return data;
  };
}
