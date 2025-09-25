
import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import type { Booking } from './types';
import { UserRole } from './types';

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('eventhive-bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const addBooking = (newBookingData: Omit<Booking, 'id' | 'timestamp'>) => {
    const booking: Booking = {
      ...newBookingData,
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
    };
    const updatedBookings = [...bookings, booking];
    setBookings(updatedBookings);
    localStorage.setItem('eventhive-bookings', JSON.stringify(updatedBookings));
    return booking;
  };
  
  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/event/:id" element={<EventPage bookings={bookings} addBooking={addBooking} />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute allowedRoles={[UserRole.ORGANIZER]}>
                    <DashboardPage bookings={bookings} />
                  </PrivateRoute>
                } 
              />
            </Routes>
          </main>
          <footer className="bg-card border-t border-border mt-auto py-4">
              <div className="container mx-auto text-center text-text-secondary text-sm">
                  <p>&copy; {new Date().getFullYear()} EventHive. All rights reserved.</p>
              </div>
          </footer>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
