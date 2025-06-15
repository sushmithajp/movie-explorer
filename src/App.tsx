import "./App.css";
import { Link, Route, Routes } from "react-router";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import WatchLater from "./pages/WatchLater";

function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-800 text-white flex gap-4 w-full">
        <Link to="/">Home</Link>
        <Link to="/watch-later">Watch Later</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<MovieDetails />}></Route>
        <Route path="/watch-later" element={<WatchLater />}></Route>
      </Routes>
    </div>
  );
}

export default App;
