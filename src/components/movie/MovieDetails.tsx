
import type { Movie, Theater, Show } from '../../types';

interface MovieDetailsProps {
    movie: Movie | null;
    activeTheater: Theater | null;
    selectedDate: string;
    activeShow: Show | undefined;
    onBookNow: () => void;
}

export default function MovieDetails({ movie, activeTheater, selectedDate, activeShow, onBookNow }: MovieDetailsProps) {
    return (
        <div className="col-span-2 flex flex-col">
            <div className="overflow-hidden rounded-3xl shadow-xl">
                <img
                    className="w-full h-[50vh] object-cover hover:scale-105 transition-transform duration-300"
                    src={movie?.image}
                    alt={movie?.name}
                />
            </div>

            <h2 className="text-3xl font-bold text-blue-500 mt-6">
                {movie?.name}
            </h2>
            <p className="text-lg text-gray-500 mt-2">
                {movie?.description}
            </p>

            <div className="flex flex-col gap-1 mt-4 text-sm text-gray-600 font-semibold">
                <p>Duration: {movie?.duration} mins</p>
                <p>Languages: {movie?.languages?.join(', ')}</p>
                <p>Genre: {movie?.category?.join(', ')}</p>
            </div>

            <div className="mt-6  w-full border-2 border-dashed border-blue-400 rounded-3xl flex items-center justify-center text-blue-400">
                <div className="flex flex-col gap-2 py-4">
                    <h2 className='text-2xl font-bold'>
                        {activeTheater?.name}
                    </h2>
                    <p className="text-md">Date: {selectedDate || '--'}</p>
                    <p className="text-md">
                        Time: {activeShow
                            ? new Date(activeShow.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            : '--'}
                    </p>
                    <p className='text-md'>*Seat selection can be done after this</p>
                    <button
                        onClick={onBookNow}
                        disabled={!activeShow}
                        className={`text-2xl font-semibold border-blue-500 border-2 rounded-2xl cursor-pointer px-4 py-2 transition-all duration-150 ease-in ${activeShow
                            ? 'hover:bg-blue-500 hover:text-white'
                            : 'opacity-50 cursor-not-allowed'
                            }`}
                    >
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
}
