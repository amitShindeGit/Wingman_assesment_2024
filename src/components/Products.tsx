import { useCallback, useEffect, useState } from "react";
import ProductService from "../services/products";
import {
  useAppDispatch,
  useAppSelector,
} from "../state-management/hooks/hooks";
import { addProducts } from "../state-management/slice/products";
import Card from "./Card";
import Loader from "./Loader";

const Products = () => {
  const productState = useAppSelector((state) => state.productState);
  const { products } = productState;
  console.log(productState, "prodStateRed");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ProductService.fetchNpmPackages();
      console.log(data, "data");
      dispatch(addProducts(data));
      setIsLoading(false);
    } catch (e) {
      //TODO HANDLE THIS
      console.log(e, "E");
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

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
