import { ArrowLeft, MapPin, Film } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import SeatCountModal from '../components/SeatCountModal';
import Loader from '../components/Loader';
import { useTheaterDetails } from '../hooks/useTheaterDetails';
import { getAvailableDates, isSameDay } from '../utils/dateUtils';
import DateSelector from '../components/theater/DateSelector';
import MovieShowtimeCard from '../components/theater/MovieShowtimeCard';

export default function TheaterItem() {
  const navigate = useNavigate();
  const { theaterId } = useParams();
  const location = useLocation();
  const currentTheater = location.state;

  const { movies, shows, loading } = useTheaterDetails(theaterId);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [showSeatModal, setShowSeatModal] = useState(false);

  const availableDates = useMemo(() => getAvailableDates(shows), [shows]);

  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      setSelectedDate(availableDates[0].toDateString());
    }
  }, [availableDates, selectedDate]);

  useEffect(() => {
    setSelectedShowId(null);
  }, [selectedDate]);

  const visibleMovies = useMemo(() => {
    if (!selectedDate) return [];

    return movies.filter(movie => {
      return shows.some(show =>
        show.movieId === movie.id &&
        new Date(show.startTime).toDateString() === selectedDate
      );
    });
  }, [movies, shows, selectedDate]);

  const handleBookNow = () => {
    if (!selectedShowId) return;
    setShowSeatModal(true);
  };

  const handleSeatConfirm = (seatCount: number) => {
    if (!selectedShowId) return;

    const show = shows.find(s => s.id === selectedShowId);
    if (!show) return;

    setShowSeatModal(false);
    navigate(`/book/${selectedShowId}`, {
      state: {
        seats: seatCount,
        show: show,
        theater: currentTheater,
        date: selectedDate,
      },
    });
  };

  if (loading) {
    return <Loader text="Loading theater details..." />;
  }

  return (
    <div className="min-h-screen pb-20">
      <div className="pl-40 border-b shadow-sm">
        <div className="px-4 py-4 flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 transition-colors hover:text-sky-600 cursor-pointer"
          >
            <ArrowLeft className="h-full transition-transform group-hover:-translate-x-1" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-blue-600">{currentTheater?.name}</h1>
            <div className=" text-xs text-gray-500 flex gap-1">
              <MapPin className="h-3 w-3" />
              <span>{currentTheater?.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
        <DateSelector
          availableDates={availableDates}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <div className="grid gap-6">
          {visibleMovies.map((movie) => {
            const movieShows = shows.filter(
              (s) =>
                s.movieId === movie.id &&
                selectedDate &&
                isSameDay(s.startTime, selectedDate)
            );

            return (
              <MovieShowtimeCard
                key={movie.id}
                movie={movie}
                movieShows={movieShows}
                selectedShowId={selectedShowId}
                onShowSelect={setSelectedShowId}
                onBook={handleBookNow}
              />
            );
          })}

          {visibleMovies.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center rounded-3xl bg-white p-20 text-center shadow-sm">
              <div className="rounded-full bg-gray-50 p-6">
                <Film className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">No shows available</h3>
              <p className="mt-1 text-gray-500">There are no movie screenings scheduled for {selectedDate}.</p>
            </div>
          )}
        </div>
      </div>
      <SeatCountModal
        open={showSeatModal}
        onClose={() => setShowSeatModal(false)}
        onConfirm={handleSeatConfirm}
      />
    </div>
  );
}
