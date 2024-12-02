import { useCallback, useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import ProductService from "../services/products";
import {
  useAppDispatch,
  useAppSelector,
} from "../state-management/hooks/hooks";
import {
  addProducts,
  addSearchFilter,
  sortProducts,
} from "../state-management/slice/products";
import Card from "./Card";
import Loader from "./Loader";
import SearchInput from "./SearchInput";
import SortButton from "./SortButton";
import { getSortOrder } from "../utils/helpers";
import { GetFilteredAndSortedProductsProps } from "./types";
import FullPageError from "./FullPageError";

const getFilteredAndSortedProducts = ({
  products,
  searchInput,
  sort,
}: GetFilteredAndSortedProductsProps) => {
  let currentProducts = products;
  const sortOrder = sort?.order;
  const sortBy = sort?.sortBy;
  if (searchInput?.trim()?.length || searchInput === "") {
    currentProducts = currentProducts?.filter((product) =>
      product?.title?.includes(searchInput)
    );
  }

  if (sortOrder && sortBy) {
    switch (sortOrder) {
      case "asc": {
        const sortedByAscending = currentProducts?.sort(
          (a, b) => a.price - b.price
        );
        currentProducts = sortedByAscending;
        break;
      }

      case "desc": {
        const sortedByDescending = currentProducts?.sort(
          (a, b) => b.price - a.price
        );
        currentProducts = sortedByDescending;
        break;
      }

      default:
        break;
    }
  }

  return currentProducts;
};

const Products = () => {
  const productState = useAppSelector((state) => state.productState);
  const { products, searchInput, sort } = productState;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>(
    searchInput ? searchInput : ""
  );
  const debouncedValue = useDebounce(searchQuery, 1000);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await ProductService.fetchAllProducts();

      dispatch(
        addProducts({
          products: data,
          searchInput: "",
          sort: {
            sortBy: "",
            order: "",
          },
        })
      );

      setIsLoading(false);
    } catch (e) {
      setError(e + " .Something went wrong. Please try to refresh the page");
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (debouncedValue?.trim()?.length || debouncedValue === "") {
      dispatch(
        addSearchFilter({
          searchInput: debouncedValue,
          sort: sort,
        })
      );
    }
  }, [debouncedValue, dispatch, sort]);

  const handleSort = async () => {
    const sortOrder = getSortOrder(sort.order);

    dispatch(
      sortProducts({
        products: products,
        searchInput: searchInput,
        sort: {
          sortBy: "price",
          order: sortOrder,
        },
      })
    );
  };

  const renderProducts = () => {
    if (error) {
      return <FullPageError title={error} />;
    }

    return (
      <div className="p-4">
        <SearchInput
          placeHolderText="Search by name..."
          handleChange={(value) => setSearchQuery(value)}
          value={searchQuery}
        />
        <SortButton
          sort={sort.order}
          title="Sort by price"
          handleSort={handleSort}
          disabled={
            !getFilteredAndSortedProducts({ products, searchInput, sort })
              ?.length
          }
        />
        {getFilteredAndSortedProducts({ products, searchInput, sort })
          ?.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {getFilteredAndSortedProducts({ products, searchInput, sort })?.map(
              (product) => (
                <Card key={product?.id} product={product} />
              )
            )}
          </div>
        ) : (
          <h1 className=" flex h-screen flex-col justify-center items-center text-2xl font-medium tracking-wide">
            No product found
          </h1>
        )}
      </div>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    } else {
      return renderProducts();
    }
  };
  return renderContent();
};

export default Products;
