import { useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { theaterService } from '../api/services/theater.service';
import type { Show, Screen, Theater } from '../types';

export function useTheaterShows(movieId: string | undefined) {
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchTheaterShows = useCallback(async (theater: Theater) => {
        if (!movieId) return;
        setLoading(true);
        try {
            const screenRes = await theaterService.getScreens(theater.id);
            const fetchedScreens: Screen[] = (screenRes.data as any) || [];

            const showtimePromises = fetchedScreens.map(screen =>
                theaterService.getScreenDetails(screen.id)
            );
            const responses = await Promise.all(showtimePromises);

            const allShows: Show[] = responses.flatMap(
                res => (res.data as any)?.data?.screen?.showTimes ?? (res.data as any)?.screen?.showTimes ?? []
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
