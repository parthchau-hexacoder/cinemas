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
        <div className="min-h-screen p-10">
            <div className="mb-10 flex items-center gap-6">
                <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`rounded-lg px-6 py-2 text-lg font-medium transition-all duration-300 ease-in cursor-pointer ${activeTab === "upcoming"
                        ? "bg-sky-500 text-white hover:bg-sky-600 hover:scale-105"
                        : "text-sky-500 hover:bg-white"
                        }`}
                >
                    Upcoming
                </button>

                <button
                    onClick={() => setActiveTab("history")}
                    className={`rounded-lg px-6 py-2 text-lg font-medium transition-all duration-300 ease-in cursor-pointer ${activeTab === "history"
                        ? "bg-sky-500 text-white hover:bg-sky-600 hover:scale-105"
                        : "text-sky-500 hover:bg-white"
                        }`}
                >
                    History
                </button>
            </div>

            {loading && <p className="text-sky-500">Loading tickets...</p>}

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {!loading && filteredTickets.length === 0 && (
                    <div className="col-span-full py-10 text-center">
                        <p className="text-xl text-gray-500">
                            {activeTab === "upcoming"
                                ? "No upcoming tickets found"
                                : "No booking history found"}
                        </p>
                    </div>
                )}

                {filteredTickets.map((booking) => (
                    <TicketCard key={booking.id} booking={booking} />
                ))}
            </div>
        </div>
    );
}

