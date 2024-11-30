import Products from "./components/Products";
import SearchInput from "./components/SearchInput";

function App() {
  return (
    <div className="bg-stone-200">
      <SearchInput placeHolderText="Search by name..." />
      <Products />
    </div>
  );
}

export default App;
