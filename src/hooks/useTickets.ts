import { useState, useEffect } from 'react';
import { bookingService } from '../api/services/booking.service';
import type { Order } from '../types'; // Update type import if Order is used

export function useTickets() {
    const [tickets, setTickets] = useState<Order[]>([]);
    const [loading, setLoading] = useState(false);

    const loadTickets = async () => {
        try {
            setLoading(true);
            setLoading(true);
            const res = await bookingService.getOrders();
            setTickets(res.data);
        } catch (err) {
            console.error("Failed to load tickets", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTickets();
    }, []);

    return { tickets, loading, refresh: loadTickets };
}
