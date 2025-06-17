import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetails() {
  const [movie, setMovieDetails] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); //movieId is a route param, so instead of storing it as state, directly access from here

  useEffect(() => {
    async function fetchMovieDetails(id: string) {
      debugger;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!res?.ok) {
          throw new Error();
        }
        const data = await res.json();
        setMovieDetails(data);
        setLoading(false);
        console.log("Movie details is ", data);
      } catch (error) {
        setLoading(false);
      }
    }

    fetchMovieDetails(id ?? "");
  }, [id]);

  // ✅ safeguard render before data is ready
  if (loading || !movie) {
    return (
      <p className="text-center text-gray-500">Loading movie details...</p>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />

        {/* Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
          <p className="italic text-gray-400 mb-4">{movie.tagline}</p>
          <p className="text-gray-300 mb-4">{movie.overview}</p>

          <p className="mb-2">
            <span className="font-semibold">Runtime:</span> {movie.runtime} mins
          </p>
          <p className="mb-2">
            <span className="font-semibold">Release Date:</span>{" "}
            {movie.release_date}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Rating:</span> {movie.vote_average}
            ⭐
          </p>
          <p className="mb-4">
            <span className="font-semibold">Genre:</span>{" "}
            {movie.genres.map((genre: any) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </p>

          <a
            href={movie.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded"
          >
            Visit Official Page
          </a>
        </div>
      </div>
    </div>
  );
}
