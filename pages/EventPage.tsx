import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { QRCodeCanvas } from 'qrcode.react';
import { CalendarIcon, MapPinIcon, DollarSignIcon, TicketIcon, QrCodeIcon } from '../components/Icons';
import type { Booking, Event } from '../types';

interface EventPageProps {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'timestamp'>) => Booking;
  events: Event[];
}

const EventPage: React.FC<EventPageProps> = ({ bookings, addBooking, events }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ticketCount, setTicketCount] = useState(1);
  const [bookedTicketInfo, setBookedTicketInfo] = useState<Booking | null>(null);

  const event = useMemo(() => events.find(e => e.id === id), [id, events]);

  const ticketsSold = useMemo(() => {
    return bookings
      .filter(b => b.eventId === id)
      .reduce((sum, b) => sum + b.tickets, 0);
  }, [bookings, id]);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl text-text-secondary">Event not found.</h2>
      </div>
    );
  }
  
  const ticketsAvailable = event.totalTickets - ticketsSold;

  const handleBooking = () => {
    if (!user) {
      navigate('/auth', { state: { isLogin: true, from: `/event/${id}` } });
      return;
    }
    if (ticketCount > 0 && ticketCount <= ticketsAvailable) {
      const newBooking = addBooking({
        eventId: event.id,
        userId: user.id,
        userName: user.name,
        userEmail: user.email,
        tickets: ticketCount,
      });
      setBookedTicketInfo(newBooking);
    }
  };

  const eventDate = new Date(event.date);

  if (bookedTicketInfo) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="bg-card border border-border rounded-lg p-8 shadow-2xl max-w-md w-full text-center">
          <QrCodeIcon className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-text-primary mb-2">Booking Confirmed!</h2>
          <p className="text-text-secondary mb-6">Your QR code ticket is ready.</p>
          <div className="bg-white p-4 rounded-lg inline-block">
             <QRCodeCanvas 
                value={JSON.stringify({ 
                    bookingId: bookedTicketInfo.id, 
                    eventId: event.id, 
                    eventName: event.title,
                    user: user?.name 
                })} 
                size={256} 
                level={"H"}
                includeMargin={true}
            />
          </div>
          <div className="text-left mt-6 space-y-2 text-text-secondary">
            <p><strong>Event:</strong> {event.title}</p>
            <p><strong>Attendee:</strong> {user?.name}</p>
            <p><strong>Tickets:</strong> {bookedTicketInfo.tickets}</p>
            <p><strong>Booking ID:</strong> {bookedTicketInfo.id}</p>
          </div>
          <button 
            onClick={() => navigate('/')} 
            className="mt-8 w-full bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-8 md:w-1/2 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-extrabold text-text-primary mb-4">{event.title}</h1>
              <p className="text-text-secondary mb-6">{event.description}</p>
              
              <div className="space-y-4 text-lg text-text-secondary mb-8">
                <div className="flex items-center"><CalendarIcon className="w-6 h-6 mr-3 text-primary" />{eventDate.toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</div>
                <div className="flex items-center"><MapPinIcon className="w-6 h-6 mr-3 text-primary" />{event.location}</div>
                <div className="flex items-center text-secondary font-bold"><DollarSignIcon className="w-6 h-6 mr-3" />{event.price > 0 ? `${event.price.toFixed(2)}` : 'Free'}</div>
              </div>
            </div>

            <div className="bg-background p-6 rounded-lg border border-border mt-6">
              <h3 className="text-2xl font-bold mb-4 flex items-center"><TicketIcon className="w-6 h-6 mr-2 text-primary" />Get Your Tickets</h3>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-text-secondary">Tickets Available:</span>
                <span className="text-2xl font-bold text-secondary animate-pulse">{ticketsAvailable}</span>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <label htmlFor="ticket-count" className="font-semibold text-text-secondary">Quantity:</label>
                <input
                  id="ticket-count"
                  type="number"
                  min="1"
                  max={ticketsAvailable}
                  value={ticketCount}
                  onChange={(e) => setTicketCount(Math.max(1, Math.min(ticketsAvailable, parseInt(e.target.value, 10) || 1)))}
                  className="w-24 bg-gray-700 border border-border rounded-md p-2 text-center text-text-primary"
                  disabled={ticketsAvailable === 0}
                />
              </div>

              <button 
                onClick={handleBooking} 
                disabled={ticketsAvailable === 0 || ticketCount === 0}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
              >
                {ticketsAvailable === 0 ? 'Sold Out' : `Book ${ticketCount} Ticket(s) - $${(event.price * ticketCount).toFixed(2)}`}
              </button>
              {!user && <p className="text-center text-sm mt-2 text-text-secondary">You must be logged in to book tickets.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;