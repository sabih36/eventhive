
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { EVENTS } from '../data/mockData';
import type { Booking } from '../types';
import { UsersIcon } from '../components/Icons';

interface DashboardPageProps {
  bookings: Booking[];
}

const DashboardPage: React.FC<DashboardPageProps> = ({ bookings }) => {
  const { user } = useAuth();
  
  const organizerEvents = EVENTS.filter(event => event.organizerId === user?.id);
  const organizerBookings = bookings.filter(booking => organizerEvents.some(event => event.id === booking.eventId));
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary flex items-center">
            <UsersIcon className="w-8 h-8 mr-3 text-primary"/>
            Organizer Dashboard
        </h1>
        <p className="text-text-secondary mt-1">View attendees for your events.</p>
      </div>

      <div className="space-y-8">
        {organizerEvents.length > 0 ? (
          organizerEvents.map(event => {
            const eventBookings = organizerBookings.filter(b => b.eventId === event.id);
            const totalAttendees = eventBookings.reduce((sum, b) => sum + b.tickets, 0);
            return (
              <div key={event.id} className="bg-card border border-border rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 className="text-2xl font-bold text-primary">{event.title}</h2>
                        <p className="text-text-secondary text-sm">{new Date(event.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-text-secondary">Total Attendees</p>
                        <p className="text-3xl font-bold text-secondary">{totalAttendees}</p>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-background rounded-md">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-text-primary">Attendee Name</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-text-primary">Email</th>
                                <th className="text-center py-3 px-4 font-semibold text-sm text-text-primary">Tickets</th>
                                <th className="text-left py-3 px-4 font-semibold text-sm text-text-primary">Booking ID</th>
                            </tr>
                        </thead>
                        <tbody className="text-text-secondary">
                            {eventBookings.length > 0 ? eventBookings.map(booking => (
                                <tr key={booking.id} className="border-b border-border hover:bg-gray-800">
                                    <td className="py-3 px-4">{booking.userName}</td>
                                    <td className="py-3 px-4">{booking.userEmail}</td>
                                    <td className="py-3 px-4 text-center">{booking.tickets}</td>
                                    <td className="py-3 px-4 font-mono text-xs">{booking.id}</td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="text-center py-4">No attendees for this event yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-text-secondary">You have not organized any events.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
