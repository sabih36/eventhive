
export enum UserRole {
  USER = 'USER',
  ORGANIZER = 'ORGANIZER',
}

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  organizerId: string;
  totalTickets: number;
  imageUrl: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  tickets: number;
  timestamp: number;
}
