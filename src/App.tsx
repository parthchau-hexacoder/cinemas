import Home from './pages/Home.tsx'
import { Toaster } from 'react-hot-toast';
import { LoaderProvider } from './context/LoaderContext';
import { Routes, Route, useLocation } from "react-router-dom";
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
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
          />
          <Route path="/ticket" element={
            <ProtectedRoute>
              <TicketList />
            </ProtectedRoute>
          } />
          <Route path="/movie/:movieId" element={
            <ProtectedRoute>
              <MovieItem />
            </ProtectedRoute>
          } />

          <Route path="/theater/:theaterId" element={
            <ProtectedRoute>
              <TheaterItem />
            </ProtectedRoute>
          } />
          <Route path="/book/:showtimeId" element={
            <ProtectedRoute>
              <SeatBook />
            </ProtectedRoute>
          } />
          <Route path="/payment" element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          } />
          <Route path="/success/*" element={
            <ProtectedRoute>
              <Success />
            </ProtectedRoute>
          } />
          <Route path="/cancel" element={
            <ProtectedRoute>
              <Cancel />
            </ProtectedRoute>
          } />

        </Routes>
      </div>
    </LoaderProvider>

  )
}

export default App
