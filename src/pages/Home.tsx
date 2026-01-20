import { useState, useEffect } from "react";
import MovieCards from '../components/MovieCards'
import TheaterList from "../components/TheaterList";
import { movieService } from "../api/services/movie.service";
import { theaterService } from "../api/services/theater.service";
import type { Movie, Theater } from "../types";

const Home = () => {
  const tabs = ["Movie", "Theater"];
  const [activeTab, setActiveTab] = useState("Movie");


  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const res: any = await movieService.getAll();
      setMovies(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, [])

  const [theaters, setTheater] = useState<Theater[]>([]);
  const [loadingTheaters, setLoadingTheaters] = useState(true);

  const getTheaterData = async () => {
    try {
      setLoadingTheaters(true);
      const res: any = await theaterService.getAll();
      setTheater(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingTheaters(false);
    }
  }
  useEffect(() => {
    getTheaterData();
  }, [])

  return (
    <div className="">

      <div className="px-6 md:px-10 lg:px-20 xl:px-40 pt-8 pb-10">
        <h1 className="text-3xl md:text-5xl font-bold text-blue-600 mb-6 text-center md:text-left">
          Now Showing
        </h1>

        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-6 md:px-8 py-2 rounded-2xl text-base md:text-lg font-medium
                transition-all duration-150 cursor-pointer flex-1 md:flex-none
                ${activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:bg-blue-50"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Movie' ? (
          loading ? (
            <p className="text-center text-sky-500 text-xl py-10">Loading movies...</p>
          ) : (
            <MovieCards movies={movies} />
          )
        ) : (
          loadingTheaters ? (
            <p className="text-center text-sky-500 text-xl py-10">Loading theaters...</p>
          ) : (
            <TheaterList theaters={theaters} />
          )
        )}
      </div>

    </div>
  );
};

export default Home;
