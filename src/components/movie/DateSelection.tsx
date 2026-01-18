
interface DateSelectionProps {
    availableDates: string[];
    selectedDate: string;
    onDateSelect: (date: string) => void;
}

export default function DateSelection({ availableDates, selectedDate, onDateSelect }: DateSelectionProps) {
    return (
        <section className="mb-8">
            <h2 className="text-3xl text-blue-500 font-bold mb-4">
                Available Dates
            </h2>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:gird-cols-8 gap-4">
                {availableDates.length > 0 ? (
                    availableDates.map(date => {
                        const d = new Date(date);

                        return (
                            <button
                                key={date}
                                onClick={() => onDateSelect(date)}
                                className={`
                                    h-20 w-20 rounded-xl border-2 flex flex-col items-center justify-center
                                    transition-all duration-200 cursor-pointer
                                    ${selectedDate === date
                                        ? 'bg-blue-500 text-white border-gray-500 scale-105 shadow-lg'
                                        : 'border-blue-300  hover:bg-blue-50 hover:scale-105 hover:text-blue-600'
                                    }
                                `}
                            >
                                <span className="text-sm font-semibold uppercase">
                                    {d.toLocaleDateString('en-IN', { weekday: 'short' })}
                                </span>

                                <span className="text-2xl font-bold">
                                    {d.getDate()}
                                </span>

                                <span className="text-xs uppercase">
                                    {d.toLocaleDateString('en-IN', { month: 'short' })}
                                </span>
                            </button>
                        );
                    })
                ) : (
                    <p className="text-gray-400">
                        Select a theater to see available dates
                    </p>
                )}
            </div>
        </section>
    );
}
