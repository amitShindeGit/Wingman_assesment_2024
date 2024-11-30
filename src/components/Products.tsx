import { useEffect, useState } from "react";
import ProductService from "../services/products";
import { ProductItem } from "../services/types";
import Card from "./Card";
import Loader from "./Loader";
import { useAppSelector } from "../state-management/hooks/hooks";

const Products = () => {
  // const productState = useAppSelector((state) => state.productState);
  const [products, setProducts] = useState<ProductItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await ProductService.fetchNpmPackages();
      console.log(data, "data");
      setProducts(data);
      setIsLoading(false);
    } catch (e) {
      //TODO HANDLE THIS
      console.log(e, "E");
      setIsLoading(false);
    }
  };

  const renderProducts = () => {
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <Card key={product?.id} product={product} />
          ))}
        </div>
      );
    }
  };
  return renderProducts();
};

export default Products;
