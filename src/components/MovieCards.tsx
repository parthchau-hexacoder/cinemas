import { useNavigate } from 'react-router-dom';
import type { Movie } from '../types';
import MovieCard from './movie/MovieCard';

interface MovieCardProps {
  movies: Movie[];
}

const MovieCards = ({ movies }: MovieCardProps) => {

  const navigate = useNavigate();

  function handleClick(movie: Movie) {
    navigate(`/movie/${movie.id}`);
  }

  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-12">
      {movies.length === 0 && (
        <div className="col-span-full py-10 text-center">
          <p className="text-xl text-gray-500">No movies found</p>
        </div>
      )}
      {movies.map((movie: Movie) => (
        <MovieCard
          key={movie.name}
          movie={movie}
          onClick={() => handleClick(movie)}
        />
      ))}
    </div>
  )
}

export default MovieCards;

