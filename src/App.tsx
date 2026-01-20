import { Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MovieItem from './pages/MovieItem';
import TheaterItem from './pages/TheaterItem';
import SeatBook from './pages/SeatBook';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import NotFound from './pages/NotFound';

import TicketList from './components/TicketList';
import MainLayout from './components/layout/MainLayout';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoaderProvider } from './context/LoaderContext';

const App = () => {
  return (
    <LoaderProvider>
      <div className="min-h-screen bg-linear-to-r from-sky-200 via-sky-50 to-sky-200">
        <Toaster position="top-center" />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/ticket" element={<TicketList />} />
            <Route path="/movie/:movieId" element={<MovieItem />} />
            <Route path="/theater/:theaterId" element={<TheaterItem />} />
            <Route path="/payment" element={<Payment />} />
          </Route>


          <Route
            element={
              <ProtectedRoute>
                <Outlet />
              </ProtectedRoute>
            }
          >
            <Route path="/book/:showtimeId" element={<SeatBook />} />
            <Route path="/success/*" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Route>


          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </LoaderProvider>
  );
};

export default App;
