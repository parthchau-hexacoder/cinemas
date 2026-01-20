import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { theaterService } from '../api/services/theater.service';
import type { Movie, Screen, Show } from '../types';

export function useTheaterDetails(theaterId: string | undefined) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);

    const fetchTheater = async () => {
        if (!theaterId) return;

        setLoading(true);
        setError(false);
        try {
            const moviesRes: any = await theaterService.getMovies(theaterId);
            console.log(moviesRes)
            setMovies(moviesRes.data?.data.movies ?? []);

            const screensRes = await theaterService.getScreens(theaterId);
            const fetchedScreens: Screen[] = (screensRes.data as any) ?? [];

            if (!fetchedScreens.length) {
                setLoading(false);
                return;
            }

            const screenRequests = fetchedScreens.map((screen) =>
                theaterService.getScreenDetails(screen.id)
            );

            const responses = await Promise.all(screenRequests);
            const aggregatedShows = responses.flatMap(
                (res) => (res.data as any)?.data.screen?.showTimes ?? []
            );
            console.log(aggregatedShows);

            setShows(aggregatedShows);
        } catch (err) {
            console.error('Error fetching theater:', err);
            setError(true);
            toast.error("Failed to load theater details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheater();
    }, [theaterId]);

    return { movies, shows, loading, error, refresh: fetchTheater };
}
