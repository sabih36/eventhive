
import type { Event, User } from '../types';
import { UserRole } from '../types';

export const USERS: User[] = [
  { id: 'user-1', name: 'Alice', email: 'alice@example.com', role: UserRole.USER },
  { id: 'user-2', name: 'Bob (Organizer)', email: 'bob@example.com', role: UserRole.ORGANIZER },
];

export const EVENTS: Event[] = [
  {
    id: 'event-1',
    title: 'Starlight Music Festival',
    description: 'An unforgettable night under the stars with the world\'s top electronic music artists. Featuring a dazzling light show and immersive soundscapes.',
    date: '2024-09-15T19:00:00Z',
    location: 'Echo Canyon Amphitheater',
    price: 75.00,
    organizerId: 'user-2',
    totalTickets: 5000,
    imageUrl: 'https://picsum.photos/seed/music/600/400',
  },
  {
    id: 'event-2',
    title: 'Future of Tech Summit',
    description: 'Join industry leaders and visionaries to explore the next wave of technological innovation, from AI to quantum computing.',
    date: '2024-10-22T09:00:00Z',
    location: 'Metropolis Convention Center',
    price: 199.99,
    organizerId: 'user-2',
    totalTickets: 1500,
    imageUrl: 'https://picsum.photos/seed/tech/600/400',
  },
  {
    id: 'event-3',
    title: 'Culinary Masters Cook-Off',
    description: 'Watch celebrity chefs battle it out in a live cooking competition. Sample exquisite dishes and learn new techniques.',
    date: '2024-11-05T18:00:00Z',
    location: 'Grand Plaza Ballroom',
    price: 120.00,
    organizerId: 'user-2',
    totalTickets: 300,
    imageUrl: 'https://picsum.photos/seed/food/600/400',
  },
    {
    id: 'event-4',
    title: 'Indie Film Showcase',
    description: 'A curated selection of the best independent films of the year, followed by Q&A sessions with the directors.',
    date: '2024-11-18T17:00:00Z',
    location: 'The Royal Cinema',
    price: 25.00,
    organizerId: 'user-2',
    totalTickets: 250,
    imageUrl: 'https://picsum.photos/seed/film/600/400',
  },
];
