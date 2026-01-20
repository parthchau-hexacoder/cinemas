import React, { useState } from 'react';
import { useLocation, useNavigate, useParams, Navigate } from 'react-router-dom';
import { useSeatBooking } from '../hooks/useSeatBooking';
import SeatHeader from '../components/booking/SeatHeader';
import SeatLayout from '../components/booking/SeatLayout';
import BookingSummary from '../components/booking/BookingSummary';
import type { Theater, Show } from '../types';

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

  const { sections, excludedSeats, bookedSeats, loading, show, error } = useSeatBooking(showtimeId);


  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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

  const handlePay = () => {
    const payload = {
      showtimeId: showtimeId || '',
      seatData: {
        seats: buildSeatPayload(),
      },
    };

    navigate('/payment', {
      state: {
        payload,
        amount: totalAmount,
        show: state.show || show,
        theater: state.theater,
        date: state.date,
      },
    });
  };



  if (error) {
    return <Navigate to="/404" />;
  }

  return (
    <div className="min-h-screen w-full p-4 md:p-8 font-sans text-gray-700 bg-linear-to-r from-sky-200 via-sky-50 to-sky-200">
      <SeatHeader />

      <SeatLayout
        sections={sections}
        selectedSeats={selectedSeats}
        excludedSeats={excludedSeats}
        bookedSeats={bookedSeats}
        onSeatToggle={toggleSeat}
        loading={loading}
      />

      <BookingSummary
        selectedCount={selectedSeats.length}
        maxSeats={state.seats}
        totalAmount={totalAmount}
        canPay={canPay}
        onPay={handlePay}
      />
    </div>
  );
};

export default SeatBook;