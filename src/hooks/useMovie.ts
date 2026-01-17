import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { Movie } from '../types';

export function useMovie(movieId: string | undefined) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(false);

    const getMovieData = useCallback(async () => {
        if (!movieId) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = token ? { Authorization: `Bearer ${token}` } : {};

            const res = await axios.get(`/api/movies/${movieId}`, { headers });
            setMovie(res.data);
        } catch (err) {
            console.error('Error fetching movie:', err);
            toast.error("Failed to load movie details");
        } finally {
            setLoading(false);
        }
    }, [movieId]);

    useEffect(() => {
        getMovieData();
    }, [getMovieData]);

    return { movie, loading, refresh: getMovieData };
}
