import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import DashboardPage from './pages/DashboardPage';
import AuthPage from './pages/AuthPage';
import CreateEventPage from './pages/CreateEventPage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import type { Booking, Event } from './types';
import { UserRole } from './types';
import { EVENTS as initialEvents } from './data/mockData';

const App: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const savedBookings = localStorage.getItem('eventhive-bookings');
    return savedBookings ? JSON.parse(savedBookings) : [];
  });

  const [events, setEvents] = useState<Event[]>(() => {
    const savedEvents = localStorage.getItem('eventhive-events');
    // If there are saved events, use them. Otherwise, seed with initial data.
    if (savedEvents && JSON.parse(savedEvents).length > 0) {
        return JSON.parse(savedEvents);
    }
    localStorage.setItem('eventhive-events', JSON.stringify(initialEvents));
    return initialEvents;
  });

  useEffect(() => {
    localStorage.setItem('eventhive-events', JSON.stringify(events));
  }, [events]);

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
  
  const addEvent = (newEventData: Omit<Event, 'id' | 'organizerId'>, organizerId: string) => {
      const event: Event = {
          ...newEventData,
          id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          organizerId,
      };
      setEvents(prevEvents => [...prevEvents, event]);
      return event;
  };

  return (
    <AuthProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage events={events} />} />
              <Route path="/event/:id" element={<EventPage bookings={bookings} addBooking={addBooking} events={events} />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute allowedRoles={[UserRole.ORGANIZER]}>
                    <DashboardPage bookings={bookings} events={events} />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/create-event"
                element={
                    <PrivateRoute allowedRoles={[UserRole.ORGANIZER]}>
                        <CreateEventPage addEvent={addEvent} />
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