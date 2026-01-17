import { formatDateBox } from '../../utils/dateUtils';

interface DateSelectorProps {
    availableDates: Date[];
    selectedDate: string | null;
    onDateSelect: (dateKey: string) => void;
}

export default function DateSelector({ availableDates, selectedDate, onDateSelect }: DateSelectorProps) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b">
                {availableDates.length > 0 ? (
                    availableDates.map((d) => {
                        const box = formatDateBox(d);
                        const isActive = selectedDate === box.key;
                        return (
                            <button
                                key={box.key}
                                onClick={() => onDateSelect(box.key)}
                                className={`flex min-w-[70px] flex-col items-center rounded-xl border-2 py-3 px-2 transition-all duration-200
                      ${isActive
                                        ? 'border-sky-500 bg-sky-500 text-white shadow-lg shadow-sky-200 ring-2 ring-sky-100 ring-offset-1'
                                        : 'border-white bg-white text-gray-600 hover:border-sky-200 hover:bg-gray-50'}`}
                            >
                                <span className={`text-[10px] uppercase tracking-wider ${isActive ? 'text-sky-100' : 'text-gray-400'}`}>
                                    {box.day}
                                </span>
                                <span className="text-xl font-bold">{box.date}</span>
                                <span className={`text-[10px] font-medium ${isActive ? 'text-sky-100' : 'text-gray-400'}`}>
                                    {box.month}
                                </span>
                            </button>
                        );
                    })
                ) : (
                    <div className="w-full rounded-xl bg-gray-100 p-8 text-center text-gray-500">
                        No dates with available shows.
                    </div>
                )}
            </div>
        </div>
    );
}
