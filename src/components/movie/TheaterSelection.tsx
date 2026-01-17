
import type { Theater } from '../../types';

interface TheaterSelectionProps {
    theaters: Theater[] | undefined;
    activeTheater: Theater | null;
    onTheaterSelect: (theater: Theater) => void;
}

export default function TheaterSelection({ theaters, activeTheater, onTheaterSelect }: TheaterSelectionProps) {
    return (
        <section>
            <h2 className="text-3xl text-blue-500 font-bold mb-4">
                Theater
            </h2>
            <div className="flex flex-wrap gap-2">
                {theaters?.map(theater => (
                    <button
                        key={theater.id}
                        onClick={() => onTheaterSelect(theater)}
                        className={`border border-blue-500 px-6 py-2  rounded-2xl text-lg transition-all duration-150 ease-in  cursor-pointer hover:scale-105 ${activeTheater?.id === theater.id
                            ? 'bg-blue-500 text-white'
                            : 'hover:bg-white hover:text-blue-600'
                            }`}
                    >
                        {theater.name}
                    </button>
                ))}
            </div>
        </section>
    );
}
