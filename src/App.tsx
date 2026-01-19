import Home from './pages/Home.tsx'
import { Toaster } from 'react-hot-toast';
import { LoaderProvider } from './context/LoaderContext';
import { Routes, Route, Outlet } from "react-router-dom";
import Login from './pages/Login.tsx'
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import Signup from './pages/Signup.tsx';
import SeatBook from './pages/SeatBook.tsx';
import MovieItem from './pages/MovieItem.tsx';
import TheaterItem from './pages/TheaterItem.tsx'
import Payment from './pages/Payment.tsx';
import Success from './pages/Success.tsx';
import Cancel from './pages/Cancel.tsx';
import TicketList from './components/TicketList.tsx';
import NotFound from './pages/NotFound.tsx';
// Layouts
import MainLayout from './components/layout/MainLayout.tsx';

const App = () => {
  return (
    <LoaderProvider>
      <div className='min-h-screen bg-linear-to-r from-sky-200 via-sky-50 to-sky-200'>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes with Navbar */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Home />} />
            <Route path="/ticket" element={<TicketList />} />
            <Route path="/movie/:movieId" element={<MovieItem />} />
            <Route path='/theater/:theaterId' element={<TheaterItem />} />
            <Route path="/payment" element={<Payment />} />
          </Route>

          {/* Protected Routes WITHOUT Navbar */}
          <Route element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }>
            <Route path="/book/:showtimeId" element={<SeatBook />} />
            <Route path="/success/*" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </LoaderProvider>
  )
}

export default App
