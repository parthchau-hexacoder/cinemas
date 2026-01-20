import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import type { Show, Theater } from '../types';
import SeatCountModal from '../components/SeatCountModal';
import { ArrowLeftFromLine } from 'lucide-react';
import { useMovie } from '../hooks/useMovie';
import { useTheaterShows } from '../hooks/useTheaterShows';
import DateSelection from '../components/movie/DateSelection';
import TheaterSelection from '../components/movie/TheaterSelection';
import ShowtimeSelection from '../components/movie/ShowtimeSelection';
import MovieDetails from '../components/movie/MovieDetails';

import { getAvailableDates, isSameDay } from '../utils/dateUtils';

const MovieItem = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();

    const { movie, error } = useMovie(movieId);
    const { shows: theaterShows, loading: showsLoading, fetchTheaterShows } = useTheaterShows(movieId);



    const [selectedDate, setSelectedDate] = useState<string>('');
    const [activeShow, setActiveShow] = useState<Show>();
    const [activeTheater, setactiveTheater] = useState<Theater | null>(null);
    const [showSeatModal, setShowSeatModal] = useState(false);

    useEffect(() => {
        if (movie?.theaters && movie.theaters.length > 0 && !activeTheater) {
            handleTheaterClick(movie.theaters[0]);
        }
    }, [movie]);

    const handleTheaterClick = async (inTheater: Theater) => {
        setactiveTheater(inTheater);
        await fetchTheaterShows(inTheater);
    };


    useEffect(() => {
        const availableDates = getAvailableDates(theaterShows);
        if (availableDates.length > 0) {
            setSelectedDate(availableDates[0].toDateString());
        } else {
            setSelectedDate('');
        }
    }, [theaterShows]);

    useEffect(() => {
        setActiveShow(undefined);
    }, [selectedDate]);

    const availableDates = useMemo(() => {
        const dates = getAvailableDates(theaterShows);
        return dates.map(d => d.toDateString());
    }, [theaterShows]);


    const filteredShowtimes = useMemo(() => {
        if (!selectedDate) return [];
        const now = new Date();
        return theaterShows
            .filter(show => {
                const showDate = new Date(show.startTime);
                return isSameDay(show.startTime, selectedDate) && showDate > now;
            })
            .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
    }, [theaterShows, selectedDate]);

    if (error) {
        return <Navigate to="/404" />;
    }

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 p-4 md:p-8">
            <button
                onClick={() => navigate(-1)}
                className="lg:col-span-3 text-lg md:text-xl text-gray-500 font-semibold flex items-center mb-0 cursor-pointer p-2 hover:text-blue-600 transition-colors order-1 lg:order-1 lg:mb-6">
                <ArrowLeftFromLine size={28} className="mr-2" />
                Back
            </button>

            <div className="lg:col-span-3 w-full order-3 lg:order-2">
                <DateSelection
                    availableDates={availableDates}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                />

                <TheaterSelection
                    theaters={movie?.theaters}
                    activeTheater={activeTheater}
                    onTheaterSelect={handleTheaterClick}
                />

                <ShowtimeSelection
                    loading={showsLoading}
                    filteredShowtimes={filteredShowtimes}
                    activeShow={activeShow}
                    activeTheater={activeTheater}
                    onShowSelect={setActiveShow}
                />
            </div>

            <div className="lg:col-span-2 w-full order-2 lg:order-3 lg:row-span-2 lg:col-start-4 lg:row-start-1">
                <MovieDetails
                    movie={movie}
                    activeTheater={activeTheater}
                    selectedDate={selectedDate}
                    activeShow={activeShow}
                    onBookNow={() => setShowSeatModal(true)}
                />
            </div>

            <SeatCountModal
                open={showSeatModal}
                onClose={() => setShowSeatModal(false)}
                onConfirm={(seatCount) => {
                    setShowSeatModal(false);

                    if (activeShow) {
                        console.log(activeShow)
                        navigate(`/book/${activeShow.id}`, {
                            state: {
                                seats: seatCount,
                                show: activeShow,
                                theater: activeTheater,
                                date: selectedDate,
                            },
                        });
                    }
                }}
            />
        </div>
    );
};

export default MovieItem;
