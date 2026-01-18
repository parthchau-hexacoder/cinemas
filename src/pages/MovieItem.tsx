import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Show, Theater } from '../types';
import SeatCountModal from '../components/SeatCountModal';
import { ArrowLeftFromLine } from 'lucide-react';
import { useMovie } from '../hooks/useMovie';
import { useTheaterShows } from '../hooks/useTheaterShows';
import DateSelection from '../components/movie/DateSelection';
import TheaterSelection from '../components/movie/TheaterSelection';
import ShowtimeSelection from '../components/movie/ShowtimeSelection';
import MovieDetails from '../components/movie/MovieDetails';

const formatDateToISO = (dateInput: string | Date): string => {
    const date = new Date(dateInput);
    return date.toISOString().split('T')[0];
};

const MovieItem = () => {
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();

    const { movie } = useMovie(movieId);
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

    // Update selected date when shows change
    useEffect(() => {
        if (theaterShows.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dates = theaterShows
                .filter(show => {
                    const showDate = new Date(show.startTime);
                    showDate.setHours(0, 0, 0, 0);
                    return showDate.getTime() >= today.getTime();
                })
                .map(show => formatDateToISO(show.startTime));

            const uniqueDates = Array.from(new Set(dates)).sort();
            if (uniqueDates.length > 0) {
                setSelectedDate(uniqueDates[0]);
            } else {
                setSelectedDate('');
            }
        }
    }, [theaterShows]);

    const availableDates = useMemo(() => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const dates = theaterShows
            .filter(show => {
                const showDate = new Date(show.startTime);
                showDate.setHours(0, 0, 0, 0);
                return showDate.getTime() >= today.getTime();
            })
            .map(show => formatDateToISO(show.startTime));

        return Array.from(new Set(dates)).sort();
    }, [theaterShows]);


    const filteredShowtimes = useMemo(() => {
        return theaterShows.filter(show => {
            return formatDateToISO(show.startTime) === selectedDate;
        });
    }, [theaterShows, selectedDate]);

    return (
        <div className="flex flex-col lg:grid lg:grid-cols-5 gap-8 p-4 md:p-8">
            <div className="lg:col-span-3 pt-4 md:pt-8 w-full order-2 lg:order-1">
                <button
                    onClick={() => navigate(-1)}
                    className="text-lg md:text-xl text-gray-500 font-semibold flex items-center mb-6 cursor-pointer p-2 hover:text-blue-600 transition-colors">
                    <ArrowLeftFromLine size={28} className="mr-2" />
                    Back
                </button>

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

            <div className="lg:col-span-2 w-full order-1 lg:order-2">
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
