import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { Show, Theater } from '../types';
import axios from 'axios';

interface Section {
  name: string;
  price: number;
  rows: string[];
  columns: number[];
}

interface BookingState {
  seats: number;
  show?: Show;
  theater?: Theater;
  date?: string;
}

const SeatBook: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showtimeId } = useParams();

  const state: BookingState = location.state ?? {
    seats: 1,
  };


  const fetchShow = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`/api/show-times/${showtimeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )


      const showData = res.data.data;
      const prices = showData.price;
      const layout = typeof showData.screen.layout === 'string'
        ? JSON.parse(showData.screen.layout)
        : showData.screen.layout;
      const orders = showData.orders || [];


      const bookedSeatsSet = new Set<string>();
      orders.forEach((order: any) => {
        if (order.seatData?.seats) {
          order.seatData.seats.forEach((seat: any) => {
            const seatId = `${seat.row}${seat.column}`;
            bookedSeatsSet.add(seatId);
          });
        }
      });
      setBookedSeats(bookedSeatsSet);


      const sectionData: Section[] = layout.map((layoutSection: any) => {
        const layoutType = layoutSection.type;



        const priceInfo = prices.find((p: any) => p.layoutType === layoutType);


        let allRows: string[] = [];
        if (layoutSection.layout?.rows) {
          allRows = layoutSection.layout.rows;
        } else if (layoutSection.rows) {
          allRows = layoutSection.rows;
        }


        const excludedRows = layoutSection.excludedRows || [];
        const availableRows = allRows.filter((row: string) => !excludedRows.includes(row));


        let columns: number[] = [];
        if (layoutSection.layout?.columns) {
          const [start, end] = layoutSection.layout.columns;
          columns = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        } else if (layoutSection.columns) {
          const [start, end] = layoutSection.columns;
          columns = Array.from({ length: end - start + 1 }, (_, i) => start + i);
        }


        const excludedColumns = layoutSection.excludedColumns || [];
        const excludedSeats = layoutSection.excludedSeats || [];


        excludedSeats.forEach((seatId: string) => {
          excludedSeatsSet.add(seatId);
        });


        excludedColumns.forEach((col: number) => {
          availableRows.forEach((row: string) => {
            excludedSeatsSet.add(`${row}${col}`);
          });
        });

        return {
          name: layoutType,
          price: priceInfo?.price || 0,
          rows: availableRows,
          columns: columns.filter((col: number) => !excludedColumns.includes(col)),
        };
      });

      setSections(sectionData);
      setExcludedSeats(excludedSeatsSet);

    } catch (err: any) {
      console.error('=== Error Fetching Show ===');
      console.error('Error:', err);
      console.error('Error response:', err.response?.data);
    }
  }

  useEffect(() => {
    fetchShow();
  }, [showtimeId])




  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [sections, setSections] = useState<Section[] | null>(null);
  const [excludedSeats, setExcludedSeats] = useState<Set<string>>(new Set());
  const [bookedSeats, setBookedSeats] = useState<Set<string>>(new Set());


  const excludedSeatsSet = new Set<string>();


  const toggleSeat = (seatId: string) => {

    if (excludedSeats.has(seatId) || bookedSeats.has(seatId)) {
      return;
    }

    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId);
      }

      if (state && prev.length >= state.seats) {
        return prev;
      }

      return [...prev, seatId];
    });
  };

  const getSeatPrice = (seatId: string) => {
    if (!sections) return 0;

    const row = seatId.charAt(0);

    const section = sections.find((s) => s.rows.includes(row));
    return section ? section.price : 0;
  };

  const totalAmount = selectedSeats.reduce(
    (sum, seatId) => sum + getSeatPrice(seatId),
    0
  );

  const canPay = state && selectedSeats.length === state.seats;

  const buildSeatPayload = () => {
    if (!sections) return [];

    return selectedSeats.map((seatId) => {
      const row = seatId.charAt(0);
      const column = Number(seatId.slice(1));


      const section = sections.find((s) => s.rows.includes(row));


      return {
        row,
        column,
        layoutType: section?.name || '',
      };
    });
  };


  return (
    <div className="min-h-screen w-full p-4 md:p-8 font-sans text-gray-700 bg-linear-to-r from-sky-200 via-sky-50 to-sky-200">

      <header
        onClick={() => navigate(-1)}
        className="mb-8 md:mb-12 flex items-center gap-3 md:gap-4 cursor-pointer group">
        <ArrowLeft className="h-6 w-6 md:h-8 md:w-8 text-sky-500 transition-transform group-hover:-translate-x-1" />
        <h1 className="text-2xl md:text-4xl font-bold text-sky-500">Select Seat</h1>
      </header>


      <main className="mx-auto max-w-4xl space-y-8 md:space-y-12">
        {sections && sections.map((section) => (
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
                          onClick={() => toggleSeat(seatId)}
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
      </main>


      <footer className="mt-12 md:mt-20 flex flex-col items-center gap-4 mb-24 md:mb-32">
        <div className="h-1.5 md:h-2 w-full max-w-lg rounded-full bg-gray-300 shadow-inner" />
        <p className="text-[10px] md:text-sm tracking-widest text-gray-500 uppercase">
          All eyes this way please!
        </p>
      </footer>

      {/* Persistent Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] z-20">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            <p className="text-xs md:text-sm text-gray-500">
              {selectedSeats.length}/{state?.seats} seats selected
            </p>
            <p className="text-base md:text-lg font-bold text-gray-800">
              ₹{totalAmount}
            </p>
          </div>

          <button
            disabled={!canPay}
            onClick={() => {
              const payload = {
                showtimeId,
                seatData: {
                  seats: buildSeatPayload(),
                },
              };

              navigate('/payment', {
                state: {
                  payload,
                  amount: totalAmount,
                  show: state?.show,
                  theater: state?.theater,
                  date: state?.date,
                },
              });
            }}
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

    </div>
  );
};

export default SeatBook;