import { useState, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { Show, Screen, Theater } from '../types';

export function useTheaterShows(movieId: string | undefined) {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTheaterShows = useCallback(async (theater: Theater) => {
        if (!movieId) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const screenRes = await axios.get(`/api/theaters/${theater.id}/screens`, { headers });
            const fetchedScreens: Screen[] = screenRes.data;

            const showtimePromises = fetchedScreens.map(screen =>
                axios.get(`/api/screens/${screen.id}`, { headers })
            );
            const responses = await Promise.all(showtimePromises);

            const allShows: Show[] = responses.flatMap(
                res => res.data.data.screen.showTimes
            );
            const movieShows = allShows.filter(
                show => show.movieId === movieId
            );

            setShows(movieShows);
        } catch (err) {
            console.error('Error fetching theater data:', err);
            toast.error("Failed to load theater data");
            setShows([]);
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    return { shows, loading, fetchTheaterShows };
}
