import { useState, useEffect } from "react";
import MovieCards from '../components/MovieCards'
import TheaterList from "../components/TheaterList";
import axios from "axios";
import type { Movie, Theater } from "../types";

const Home = () => {
  const tabs = ["Movie", "Theater"];
  const [activeTab, setActiveTab] = useState("Movie");


  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Get token from localStorage
      const res = await axios.get('/api/movies',
        {
          headers: {
            Authorization: `Bearer ${token}`, // Use token from localStorage
          },
        }
      )
      setMovies(res.data);
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
      const token = localStorage.getItem('token');
      const res = await axios.get('/api/theaters', // Changed URL back to /api/theaters as per original intent
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )


      setTheater(res.data.data); // Corrected syntax and kept original state setter
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

      <div className="px-40 pt-8">
        <h1 className="text-5xl font-bold text-blue-600 mb-6">
          Now Showing
        </h1>

        <div className="flex items-center gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-8 py-2 rounded-2xl text-lg font-medium
                transition-all duration-150 cursor-pointer
                ${activeTab === tab
                  ? "bg-blue-600 text-white  shadow-md"
                  : "text-blue-600  hover:bg-blue-50"
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
