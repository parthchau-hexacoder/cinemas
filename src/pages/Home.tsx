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
      const res = await axios.get('http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/movies',
        {
          headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxMjNAZ21haWwuY29tIiwiaWQiOiIxMzcxMmM5OC0zYmMyLTQzOTYtYjdjYy1iMTM4YTFjNWQ3OWYiLCJpYXQiOjE3NjgyMTU0NTYsImV4cCI6MTc2ODgyMDI1Nn0.kohhXSZXSNwZ4faQA-pAW72Hx9nChJFkbrAoJq2oE6g',
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
      const res = await axios.get('http://ec2-13-201-98-117.ap-south-1.compute.amazonaws.com:3000/theaters',
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      setTheater(res.data.data);
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
