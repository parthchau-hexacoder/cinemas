import React from 'react';
import type { SectionData } from '../../hooks/useSeatBooking';

interface SeatLayoutProps {
    sections: SectionData[] | null;
    selectedSeats: string[];
    excludedSeats: Set<string>;
    bookedSeats: Set<string>;
    onSeatToggle: (seatId: string) => void;
    loading: boolean;
}

const SeatLayout: React.FC<SeatLayoutProps> = ({
    sections,
    selectedSeats,
    excludedSeats,
    bookedSeats,
    onSeatToggle,
    loading
}) => {
    if (loading) {
        return <div className="text-center py-20 text-gray-500">Loading seat layout...</div>;
    }

    if (!sections) return null;

    return (
        <main className="mx-auto max-w-4xl space-y-8 md:space-y-12 mb-24 md:mb-32">
            {sections.map((section) => (
                <div key={section.name} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-xs md:text-sm font-medium text-gray-500 px-2">
                            ₹{section.price} {section.name}
                        </span>
                        <div className="h-px w-full bg-gray-200" />
                    </div>

                    <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
                        <div className="space-y-2 md:space-y-3 pt-4 min-w-max mx-auto flex flex-col items-center">
                            {section.rows.map((rowLabel) => (
                                <div key={rowLabel} className="flex justify-center gap-2 md:gap-3">
                                    <span className="w-4 text-[10px] md:text-xs text-gray-400 flex items-center justify-center">{rowLabel}</span>
                                    {section.columns.map((columnNumber) => {
                                        const seatId = `${rowLabel}${columnNumber}`;
                                        const isSelected = selectedSeats.includes(seatId);
                                        const isExcluded = excludedSeats.has(seatId);
                                        const isBooked = bookedSeats.has(seatId);

                                        return (
                                            <button
                                                key={seatId}
                                                onClick={() => onSeatToggle(seatId)}
                                                disabled={isExcluded || isBooked}
                                                className={`
                          flex h-8 w-10 md:h-10 md:w-12 items-center justify-center rounded-md border text-[9px] md:text-[11px] font-semibold transition-all
                          ${isBooked
                                                        ? 'border-red-300 bg-red-100 text-red-400 cursor-not-allowed'
                                                        : isExcluded
                                                            ? 'border-gray-200 bg-gray-100 text-gray-300 cursor-not-allowed'
                                                            : isSelected
                                                                ? 'border-sky-500 bg-sky-500 text-white shadow-md'
                                                                : 'border-gray-300 bg-white text-gray-500 hover:border-sky-400 cursor-pointer'
                                                    }
                        `}
                                            >
                                                {seatId}
                                            </button>
                                        );
                                    })}
                                    <span className="w-4 text-[10px] md:text-xs text-gray-400 flex items-center justify-center">{rowLabel}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            <div className="mt-12 md:mt-20 flex flex-col items-center gap-4">
                <div className="h-1.5 md:h-2 w-full max-w-lg rounded-full bg-gray-300 shadow-inner" />
                <p className="text-[10px] md:text-sm tracking-widest text-gray-500 uppercase">
                    All eyes this way please!
                </p>
            </div>
        </main>
    );
};

export default SeatLayout;
