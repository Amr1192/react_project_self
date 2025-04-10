import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderLayOut from "./components/HeaderLayOut";
import MoviesList from "./pages/MoviesList";
import MovieDetails from "./pages/MovieDetails";
import TVList from "./pages/TVList";
import TVDetails from "./pages/TVDetails";
import Wishlist from "./pages/Wishlist";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayOut />}>
          <Route path="/" element={<MoviesList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/TV" element={<TVList />} />
          <Route path="/TV/:id" element={<TVDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
