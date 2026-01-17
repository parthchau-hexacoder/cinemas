import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Booking } from '../types';

export function useTickets() {
    const [tickets, setTickets] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    const loadTickets = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");

            const res = await axios.get<Booking[]>(
                '/api/orders',
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

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
