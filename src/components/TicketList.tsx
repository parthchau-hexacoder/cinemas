import { useMemo, useState } from "react";
import { useTickets } from "../hooks/useTickets";
import TicketCard from "./tickets/TicketCard";

export default function TicketList() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "history">("upcoming");
    const { tickets, loading } = useTickets();

    const filteredTickets = useMemo(() => {
        const now = new Date();

        return tickets.filter((t) => {
            const showTime = new Date(t.showtime.startTime);
            return activeTab === "upcoming"
                ? showTime >= now
                : showTime < now;
        });
    }, [tickets, activeTab]);

    return (
        <div className="min-h-screen px-6 md:px-10 lg:px-20 py-8 md:py-10">
            <div className="mb-8 md:mb-10 flex flex-wrap items-center gap-4 md:gap-6">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`flex-1 md:flex-none rounded-2xl px-6 py-2.5 text-base md:text-lg font-medium transition-all duration-300 ease-in cursor-pointer shadow-sm ${activeTab === "upcoming"
                        ? "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-100"
                        : "bg-white text-sky-500 hover:bg-sky-50"
                        }`}
                >
                    Upcoming
                </button>

                <button
                    onClick={() => setActiveTab("history")}
                    className={`flex-1 md:flex-none rounded-2xl px-6 py-2.5 text-base md:text-lg font-medium transition-all duration-300 ease-in cursor-pointer shadow-sm ${activeTab === "history"
                        ? "bg-sky-500 text-white hover:bg-sky-600 shadow-sky-100"
                        : "bg-white text-sky-500 hover:bg-sky-50"
                        }`}
                >
                    History
                </button>
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <p className="text-sky-500 text-xl animate-pulse">Loading tickets...</p>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {!loading && filteredTickets.length === 0 && (
                    <div className="col-span-full py-20 text-center bg-white/50 rounded-3xl backdrop-blur-sm">
                        <p className="text-xl text-gray-500">
                            {activeTab === "upcoming"
                                ? "No upcoming tickets found"
                                : "No booking history found"}
                        </p>
                    </div>
                )}

                {!loading && filteredTickets.map((booking) => (
                    <TicketCard key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    );
}

