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
      <div className="bg-white w-[90%] max-w-lg rounded-3xl p-8 shadow-2xl">
        {/* Title */}
        <h2 className="text-3xl font-bold text-sky-500 text-center mb-8">
          How many seats?
        </h2>

        {/* Seat grid */}
        <div className="grid grid-cols-5 gap-5 justify-items-center mb-10">
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
                  w-16 h-16 rounded-xl border-2 text-lg font-semibold
                  transition-all
                  ${
                    active
                      ? 'border-sky-500 text-sky-500'
                      : 'border-gray-300 text-gray-600'
                  }
                  ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:border-sky-400'}
                `}
              >
                {value}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-gray-300 py-3 text-gray-600"
          >
            Cancel
          </button>

          <button
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
            className={`
              flex-1 rounded-xl py-3 font-semibold transition
              ${
                selected
                  ? 'border border-sky-500 text-sky-500 hover:bg-blue-400 hover:text-white cursor-pointer hover:scale-105 transition-all duration-150 ease-in'
                  : 'border border-gray-300 text-gray-300 cursor-not-allowed'
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
