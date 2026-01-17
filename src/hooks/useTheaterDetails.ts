import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import type { Movie, Screen, Show } from '../types';

const BASE_URL = 'http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000';

export function useTheaterDetails(theaterId: string | undefined) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchTheater = async () => {
        if (!theaterId) return;

        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const headers = { Authorization: `Bearer ${token}` };

            const moviesRes = await axios.get(`${BASE_URL}/theaters/${theaterId}/movies`, { headers });
            setMovies(moviesRes.data?.data?.movies ?? []);

            const screensRes = await axios.get(`${BASE_URL}/theaters/${theaterId}/screens`, { headers });
            const fetchedScreens: Screen[] = screensRes.data ?? [];

            if (!fetchedScreens.length) {
                setLoading(false);
                return;
            }

            const screenRequests = fetchedScreens.map((screen) =>
                axios.get(`${BASE_URL}/screens/${screen.id}`, { headers })
            );

            const responses = await Promise.all(screenRequests);
            const aggregatedShows = responses.flatMap(
                (res) => res.data?.data?.screen?.showTimes ?? []
            );

            setShows(aggregatedShows);
        } catch (err) {
            console.error('Error fetching theater:', err);
            toast.error("Failed to load theater details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTheater();
    }, [theaterId]);

    return { movies, shows, loading, refresh: fetchTheater };
}
