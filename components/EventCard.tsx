
import React from 'react';
import type { Event } from '../types';
import { Link } from 'react-router-dom';
import { CalendarIcon, MapPinIcon, DollarSignIcon } from './Icons';

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const eventDate = new Date(event.date);

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300 ease-in-out flex flex-col">
      <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-text-primary mb-2">{event.title}</h3>
        <p className="text-text-secondary text-sm mb-4 flex-grow">{event.description.substring(0, 100)}...</p>
        
        <div className="space-y-3 text-sm text-text-secondary mb-4">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
            <span>{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <MapPinIcon className="w-4 h-4 mr-2 text-primary" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center font-semibold">
             <DollarSignIcon className="w-4 h-4 mr-2 text-secondary" />
             <span className="text-secondary">{event.price > 0 ? `${event.price.toFixed(2)}` : 'Free'}</span>
          </div>
        </div>

        <Link 
          to={`/event/${event.id}`} 
          className="mt-auto w-full bg-primary text-white text-center font-bold py-2 px-4 rounded-md hover:bg-primary-hover transition-colors duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
