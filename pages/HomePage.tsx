
import React from 'react';
import EventCard from '../components/EventCard';
import { EVENTS } from '../data/mockData';

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary sm:text-5xl md:text-6xl">
          Discover Your Next <span className="text-primary">Experience</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-lg text-text-secondary sm:text-xl md:mt-5 md:max-w-3xl">
          Browse our curated list of events. From music festivals to tech summits, find something that excites you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {EVENTS.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
