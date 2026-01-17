import type { Booking } from "../../types";
import { downloadTicket } from "../../utils/downloadTicket";

interface TicketCardProps {
    booking: Booking;
}

export default function TicketCard({ booking }: TicketCardProps) {
    const formatDate = (iso: string) =>
        new Date(iso).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });

    const formatTime = (iso: string) =>
        new Date(iso).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
        });

    const formatSeats = (booking: Booking) =>
        booking.seatData.seats
            .map((s) => `${s.row}${s.column}`)
            .join(", ");

    return (
        <div className="w-full max-w-md rounded-2xl border-2 border-sky-400 p-6">
            <p className="text-sm text-sky-500">Date</p>
            <p className="mb-6 text-lg font-medium text-gray-700">
                {formatDate(booking.showtime.startTime)}
            </p>

            <p className="text-sm text-sky-500">Movie Title</p>
            <p className="mb-6 text-lg font-semibold text-gray-800">
                {booking.showtime.movie.name}
            </p>

            <div className="mb-8 flex justify-between">
                <div>
                    <p className="text-sm text-sky-500">
                        Tickets ({booking.seatData.seats.length})
                    </p>
                    <p className="text-base font-medium text-gray-700">
                        {formatSeats(booking)}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-sm text-sky-500">Time</p>
                    <p className="text-base font-medium text-gray-700">
                        {formatTime(booking.showtime.startTime)}
                    </p>
                </div>
            </div>

            <button
                onClick={() => downloadTicket(booking)}
                className="w-full cursor-pointer rounded-xl border-2 border-sky-400 py-3 text-sm font-semibold text-sky-500 transition hover:bg-sky-50 hover:scale-105">
                Download Ticket
            </button>
        </div>
    );
}
