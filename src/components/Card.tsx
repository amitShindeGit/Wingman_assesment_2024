import { getEitherValue } from "../utils/helpers";
import { CardProps } from "./types";

const getRatingColor = (rate: string | number) => {
  return Number(rate) >= 3 ? "text-green-500" : "text-red-500";
};

const Card = ({ product }: CardProps) => {
  return (
    <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-white dark:bg-slate-700 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
      <img className="h-48 w-full object-cover object-center" src={product?.image} alt="Product Image" />
      <div className="p-4">
        <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">
          {getEitherValue(product?.title)}
        </h2>

        <div className="flex items-center">
          <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">
            ${getEitherValue(product?.price?.toString())}
          </p>

          <p
            className={`ml-auto text-base font-medium ${getRatingColor(
              product?.rating?.rate
            )}`}
          >
            {product?.rating?.rate} / 5
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
