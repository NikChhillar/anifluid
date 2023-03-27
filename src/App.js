import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnimeItem from "./components/AnimeItem";
import Gallery from "./components/Gallery";
import HomePage from "./components/HomePage";
import { useGlobalContext } from "./context/global";

function App() {
  // 
  const g = useGlobalContext();
  console.log(g);

  // 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime/:id" element={<AnimeItem />} />
        <Route path="/character/:id" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
