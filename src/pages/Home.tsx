import { useEffect, useState } from "react";
import type { Movie } from "../interfaces/movies";
import { useNavigate } from "react-router";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //This hook is used whenever we need to do any action on component mount.
  useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        const data = await res.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong while fetching movies.");
        setLoading(false);
      }
    }

    fetchPopularMovies();
  }, []);

  return (
    <div className="w-full mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🎬 Movie Explorer</h1>

      {loading && (
        <p className="text-center text-gray-500">Loading movies...</p>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Show movie list if available */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white shadow-md rounded-lg p-2 cursor-pointer"
            onClick={() => {
              navigate(`movie/${movie.id}`);
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-2">{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
