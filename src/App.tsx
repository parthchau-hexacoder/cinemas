import Home from './pages/Home.tsx'
import { Toaster } from 'react-hot-toast';
import { LoaderProvider } from './context/LoaderContext';
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Navbar from './components/Navbar.tsx';
import MovieItem from './pages/MovieItem.tsx';
import Login from './pages/Login.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import Signup from './pages/Signup.tsx';
import SeatBook from './pages/SeatBook.tsx';
import TheaterItem from './pages/TheaterItem.tsx'
import Payment from './pages/Payment.tsx';
import Success from './pages/Success.tsx';
import Cancel from './pages/Cancel.tsx';
import TicketList from './components/TicketList.tsx';
import NotFound from './pages/NotFound.tsx';

const App = () => {

  const location = useLocation();
  const hideNavbar = location.pathname.startsWith('/book') || location.pathname.startsWith('/success') || location.pathname.startsWith('/cancel');

  return (
    <LoaderProvider>
      <div className='min-h-screen bg-linear-to-r from-sky-200 via-sky-50 to-sky-200'>
        <Toaster position="top-center" reverseOrder={false} />
        {!hideNavbar && <Navbar />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/ticket" element={<TicketList />} />
            <Route path="/movie/:movieId" element={<MovieItem />} />
            <Route path='/theater/:theaterId' element={<TheaterItem />} />
            <Route path="/book/:showtimeId" element={<SeatBook />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success/*" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Route>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </div>
    </LoaderProvider>
  )
}

export default App
