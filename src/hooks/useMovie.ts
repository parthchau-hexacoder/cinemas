import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';
import { movieService } from '../api/services/movie.service';
import type { Movie } from '../types';

export function useMovie(movieId: string | undefined) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(false);

    const getMovieData = useCallback(async () => {
        if (!movieId) return;
        setLoading(true);
        setError(false);
        try {
            const res = await movieService.getById(movieId);
            setMovie(res.data);
        } catch (err) {
            console.error('Error fetching movie:', err);
            setError(true);
            toast.error("Failed to load movie details");
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        getMovieData();
    }, [getMovieData]);

    return { movie, loading, error, refresh: getMovieData };
}
