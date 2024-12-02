const UpArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
    />
  </svg>
);

const DownArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="size-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
    />
  </svg>
);

interface SortButtonProps {
  sort: "asc" | "desc" | "";
  title: string;
  handleSort: () => void;
  disabled: boolean;
}

const getSortIcon = (sort: "asc" | "desc" | "") => {
  switch (sort) {
    case "asc":
      return DownArrow();

    case "desc":
      return UpArrow();

    default:
      return null;
  }
};

const SortButton = ({ sort, title, handleSort, disabled }: SortButtonProps) => {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        className="text-white dark:bg-gray-700 bg-blue-700 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-gray-600 dark:focus:ring-blue-800"
        onClick={handleSort}
        disabled={disabled}
      >
        {title}
        {getSortIcon(sort)}
      </button>
    </div>
  );
};

export default SortButton;
