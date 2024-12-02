import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ThemeButton from "./components/ThemeButton";

function App() {
  return (
    <div className="bg-stone-200 dark:bg-gray-500">
      <ThemeButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<h1>Not found </h1>} />
      </Routes>
    </div>
  );
}

export default App;
