import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { TicketIcon, UsersIcon, PlusCircleIcon } from './Icons';
import type { User } from '../types';
import { UserRole } from '../types';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'bg-card text-text-primary' : 'text-text-secondary hover:bg-gray-700 hover:text-white'
    }`;

  return (
    <header className="bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <TicketIcon className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-text-primary">EventHive</span>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/" className={navLinkClasses}>Events</NavLink>
                {user?.role === UserRole.ORGANIZER && (
                  <>
                    <NavLink to="/dashboard" className={navLinkClasses}>
                      <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-1" />
                        Dashboard
                      </div>
                    </NavLink>
                    <NavLink to="/create-event" className={navLinkClasses}>
                      <div className="flex items-center">
                        <PlusCircleIcon className="w-4 h-4 mr-1" />
                        Create Event
                      </div>
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {user ? (
                <div className="ml-3 relative flex items-center gap-4">
                  <span className="text-text-secondary">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-x-2">
                  <Link to="/auth" state={{ isLogin: true }} className="text-text-secondary hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Log in</Link>
                  <Link to="/auth" state={{ isLogin: false }} className="bg-primary text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-hover">Sign up</Link>
                </div>
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <NavLink to="/" className={navLinkClasses} end>Events</NavLink>
              {user?.role === UserRole.ORGANIZER && (
                <>
                  <NavLink to="/dashboard" className={navLinkClasses}>Dashboard</NavLink>
                  <NavLink to="/create-event" className={navLinkClasses}>Create Event</NavLink>
                </>
              )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
             {user ? (
                <div className="px-2">
                    <div className="text-base font-medium leading-none text-white">{user.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    <button
                        onClick={() => { logout(); setIsMenuOpen(false); }}
                        className="mt-3 w-full text-left bg-primary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-hover"
                    >
                        Logout
                    </button>
                </div>
             ) : (
                <div className="px-2 space-y-2">
                    <Link to="/auth" state={{isLogin: true}} className="block bg-gray-700 text-white px-3 py-2 rounded-md text-base font-medium">Log in</Link>
                    <Link to="/auth" state={{isLogin: false}} className="block bg-primary text-white px-3 py-2 rounded-md text-base font-medium hover:bg-primary-hover">Sign up</Link>
                </div>
             )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;