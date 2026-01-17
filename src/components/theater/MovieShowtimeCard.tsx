import { Clock } from 'lucide-react';
import type { Movie, Show } from '../../types';
import { formatTime } from '../../utils/dateUtils';

interface MovieShowtimeCardProps {
    movie: Movie;
    movieShows: Show[];
    selectedShowId: string | null;
    onShowSelect: (id: string) => void;
    onBook: () => void;
}

export default function MovieShowtimeCard({
    movie,
    movieShows,
    selectedShowId,
    onShowSelect,
    onBook
}: MovieShowtimeCardProps) {
    const isBookDisabled = !selectedShowId || !movieShows.find(s => s.id === selectedShowId);

    return (
        <div className="overflow-hidden border-b border-gray-400 hover:shadow-2xl cursor-pointer rounded-2xl transition-all duration-200 ease-in hover:-translate-y-1 p-2 hover:bg-white">
            <div className="flex flex-col md:flex-row">
                {/* Movie Info Section */}
                <div className="flex-1 p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-gray-900">{movie.name}</h2>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {movie.languages?.map(lang => (
                                    <span key={lang} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">
                                        {lang}
                                    </span>
                                ))}
                                {movie.category?.map(cat => (
                                    <span key={cat} className="rounded-full bg-sky-50 px-2.5 py-0.5 text-[11px] font-medium text-sky-600">
                                        {cat}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-center gap-2 mb-3 text-gray-700">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-semibold">Available Showtimes</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {movieShows.map((show) => (
                                <button
                                    key={show.id}
                                    onClick={() => onShowSelect(show.id)}
                                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all
                      ${selectedShowId === show.id
                                            ? 'border-sky-500 bg-sky-50 text-sky-700 ring-2 ring-sky-100'
                                            : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-sky-200 hover:text-sky-600'
                                        }`}
                                >
                                    {formatTime(show.startTime)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Booking Button Section */}
                <div className="flex items-center justify-center p-6 md:w-64">
                    <button
                        disabled={isBookDisabled}
                        onClick={onBook}
                        className="w-full rounded-xl bg-sky-500 py-3.5 px-6 font-bold text-white shadow-lg shadow-sky-200 transition-all hover:shadow-sky-300 active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none hover:bg-white duration-200 ease-in hover:text-blue-500 cursor-pointer"
                    >
                        Book Ticket
                    </button>
                </div>
            </div>
        </div>
    );
}
