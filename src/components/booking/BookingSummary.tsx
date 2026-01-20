import React from 'react';

interface BookingSummaryProps {
    selectedCount: number;
    maxSeats: number;
    totalAmount: number;
    canPay: boolean;
    onPay: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
    selectedCount,
    maxSeats,
    totalAmount,
    canPay,
    onPay
}) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
            <div className="mx-auto flex max-w-4xl items-center justify-between">
                <div>
                    <p className="text-xs md:text-sm text-gray-500">
                        {selectedCount}/{maxSeats} seats selected
                    </p>
                    <p className="text-base md:text-lg font-bold text-gray-800">
                        ₹{totalAmount}
                    </p>
                </div>

                <button
                    disabled={!canPay}
                    onClick={onPay}
                    className={`
              rounded-xl px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base font-semibold transition-all
              ${canPay
                            ? 'bg-sky-500 text-white hover:bg-sky-600 cursor-pointer hover:scale-105 shadow-md shadow-sky-200'
                            : 'cursor-not-allowed bg-gray-200 text-gray-400'
                        }
            `}
                >
                    Pay ₹{totalAmount}
                </button>
            </div>
        </div>
    );
};

export default BookingSummary;
