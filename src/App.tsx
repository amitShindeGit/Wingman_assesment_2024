import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import ThemeButton from "./components/ThemeButton";
import FullPageError from "./components/FullPageError";

function App() {
  return (
    <div className="bg-stone-200 dark:bg-gray-500">
      <ThemeButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<FullPageError title="Page not found" />} />
      </Routes>
    </div>
  );
}

export default App;
