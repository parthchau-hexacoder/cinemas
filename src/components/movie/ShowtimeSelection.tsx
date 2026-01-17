
import Loader from '../Loader';
import type { Show, Theater } from '../../types';

interface ShowtimeSelectionProps {
    loading: boolean;
    filteredShowtimes: Show[];
    activeShow: Show | undefined;
    activeTheater: Theater | null;
    onShowSelect: (show: Show) => void;
}

export default function ShowtimeSelection({ loading, filteredShowtimes, activeShow, activeTheater, onShowSelect }: ShowtimeSelectionProps) {
    return (
        <section className="mt-12">
            <h2 className="text-3xl text-blue-500 font-bold mb-4">
                Available Times
            </h2>

            <div className="flex flex-wrap gap-2">
                {loading ? (
                    <div className="w-full flex justify-center py-4">
                        <Loader size={24} text="Loading shows..." />
                    </div>
                ) : filteredShowtimes.length > 0 ? (
                    filteredShowtimes.map((show, idx) => (
                        <button
                            key={idx}
                            onClick={() => onShowSelect(show)}
                            className={`px-4 py-2 rounded-2xl border transition-all duration-150 ease-in  ${activeShow?.id === show.id
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'border-blue-500  hover:bg-white hover:text-blue-600 hover:scale-105'
                                } font-medium cursor-pointer`}
                        >
                            {new Date(show.startTime).toLocaleTimeString(
                                [],
                                { hour: '2-digit', minute: '2-digit' }
                            )}
                        </button>
                    ))
                ) : (
                    <p className="text-gray-400">
                        {activeTheater
                            ? 'No shows available for this date.'
                            : 'Select a theater to see timings'}
                    </p>
                )}
            </div>
        </section>
    );
}
