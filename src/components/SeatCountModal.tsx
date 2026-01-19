import React, { useState, useEffect } from 'react';

type SeatCountModalProps = {
  open: boolean;
  maxSeats?: number;
  onClose: () => void;
  onConfirm: (seatCount: number) => void;
};

const SeatCountModal: React.FC<SeatCountModalProps> = ({
  open,
  maxSeats = 10,
  onClose,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    if (!open) setSelected(null);
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[95%] max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl">

        <h2 className="text-2xl md:text-3xl font-bold text-sky-500 text-center mb-6 md:mb-8">
          How many seats?
        </h2>


        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3 sm:gap-5 justify-items-center mb-8 md:mb-10">
          {Array.from({ length: 10 }, (_, i) => {
            const value = i + 1;
            const disabled = value > maxSeats;
            const active = selected === value;

            return (
              <button
                key={value}
                disabled={disabled}
                onClick={() => setSelected(value)}
                className={`
                  w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 text-base sm:text-lg font-semibold
                  transition-all
                  ${active
                    ? 'border-sky-500 text-sky-500'
                    : 'border-gray-300 text-gray-600'
                  }
                  ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-sky-400 cursor-pointer'}
                `}
              >
                {value}
              </button>
            );
          })}
        </div>


        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-3 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
            className={`
              flex-1 rounded-xl py-3 font-semibold transition
              ${selected
                ? 'bg-sky-500 text-white hover:bg-sky-600 cursor-pointer hover:scale-[1.02] shadow-md shadow-sky-100'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }
            `}
          >
            Select seats
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatCountModal;
