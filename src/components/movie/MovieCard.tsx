import type { Movie } from "../../types";

interface MovieCardProps {
    movie: Movie;
    onClick: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
    return (
        <div
            className='overflow-hidden rounded-2xl hover:cursor-pointer'
            onClick={onClick}
        >
            <div className='overflow-hidden rounded-2xl '>
                <img src={movie.image}
                    alt={movie.name}
                    className="h-100 w-full object-cover hover:scale-105 transition-all ease-in duration-150"
                />
            </div>
            <h2
                className='text-xl font-medium px-2 py-1 w-full text-center text-blue-500 '
            >
                {movie.name}
            </h2>
        </div>
    );
}
