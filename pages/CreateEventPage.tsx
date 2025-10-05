import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { Event } from '../types';
import { PlusCircleIcon } from '../components/Icons';

interface CreateEventPageProps {
  addEvent: (eventData: Omit<Event, 'id' | 'organizerId'>, organizerId: string) => Event;
}

const CreateEventPage: React.FC<CreateEventPageProps> = ({ addEvent }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState(0);
  const [totalTickets, setTotalTickets] = useState(100);
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!user) {
        setError('You must be logged in to create an event.');
        return;
    }

    if (!title || !description || !date || !location || !imageUrl) {
        setError('Please fill out all required fields.');
        return;
    }

    addEvent({
        title,
        description,
        date,
        location,
        price,
        totalTickets,
        imageUrl,
    }, user.id);

    navigate('/dashboard');
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto bg-card border border-border rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-text-primary flex items-center mb-6">
          <PlusCircleIcon className="w-8 h-8 mr-3 text-primary" />
          Create a New Event
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-text-secondary">Event Title</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary">Description</label>
                <textarea
                    id="description"
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="date" className="block text-sm font-medium text-text-secondary">Date and Time</label>
                    <input
                        id="date"
                        type="datetime-local"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="location" className="block text-sm font-medium text-text-secondary">Location</label>
                    <input
                        id="location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                    <label htmlFor="price" className="block text-sm font-medium text-text-secondary">Price ($)</label>
                    <input
                        id="price"
                        type="number"
                        min="0"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(parseFloat(e.target.value))}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                 <div>
                    <label htmlFor="totalTickets" className="block text-sm font-medium text-text-secondary">Total Tickets Available</label>
                    <input
                        id="totalTickets"
                        type="number"
                        min="1"
                        value={totalTickets}
                        onChange={(e) => setTotalTickets(parseInt(e.target.value, 10))}
                        required
                        className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-text-secondary">Image URL</label>
                <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                    placeholder="https://picsum.photos/seed/new/600/400"
                    className="mt-1 block w-full bg-gray-700 border border-border rounded-md shadow-sm py-2 px-3 text-text-primary focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                />
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="flex justify-end">
                <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover transition-colors"
                >
                    Create Event
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventPage;
