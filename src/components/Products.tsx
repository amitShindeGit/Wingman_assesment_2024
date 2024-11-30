import { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import ProductService from "../services/products";
import {
  useAppDispatch,
  useAppSelector,
} from "../state-management/hooks/hooks";
import {
  addProducts,
  filterProductsByName,
} from "../state-management/slice/products";
import Card from "./Card";
import Loader from "./Loader";
import SearchInput from "./SearchInput";

const Products = () => {
  const productState = useAppSelector((state) => state.productState);
  const { products, searchInput } = productState;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchInput ? searchInput : ""
  );
  const debouncedValue = useDebounce(searchQuery, 1000);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ProductService.fetchAllProducts();
      if (debouncedValue?.trim()?.length) {
        dispatch(
          filterProductsByName({ products: data, searchInput: debouncedValue })
        );
      } else {
        dispatch(addProducts({ products: data, searchInput: "" }));
      }
      setIsLoading(false);
    } catch (e) {
      //TODO HANDLE THIS
      console.log(e, "E");
      setIsLoading(false);
    }
  }, [dispatch, debouncedValue]);

  useEffect(() => {
    fetchProducts();
  }, [debouncedValue, fetchProducts]);

  const renderProducts = () => {
    if (isLoading) {
      return <Loader />;
    } else {
      return (
        <>
          <SearchInput
            placeHolderText="Search by name..."
            handleChange={(value) => setSearchQuery(value)}
            value={searchQuery}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products?.map((product) => (
              <Card key={product?.id} product={product} />
            ))}
          </div>
        </>
      );
    }
  };
  return renderProducts();
};

export default Products;
