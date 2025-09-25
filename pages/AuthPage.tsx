
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, signup, user } = useAuth();
  
  // Use location state to determine initial mode, default to login
  const [isLogin, setIsLogin] = useState(location.state?.isLogin ?? true);
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.USER);
  const [error, setError] = useState('');
  
  const from = location.state?.from || '/';

  useEffect(() => {
    // If user is already logged in, redirect them
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  // When location state changes (e.g., clicking login/signup from header), update mode
  useEffect(() => {
    setIsLogin(location.state?.isLogin ?? true);
  }, [location.state]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    let success = false;
    if (isLogin) {
      success = login(email);
      if (!success) setError('Invalid email or user does not exist.');
    } else {
      success = signup(name, email, role);
      if (!success) setError('A user with this email already exists.');
    }

    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg border border-border">
        <div>
          <h2 className="text-3xl font-extrabold text-center text-text-primary">
            {isLogin ? 'Sign in to your account' : 'Create a new account'}
          </h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Or{' '}
            <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-primary hover:text-primary-hover">
              {isLogin ? 'create an account' : 'sign in instead'}
            </button>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-text-primary placeholder-gray-400 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email-address" className="sr-only">Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-600 bg-gray-700 text-text-primary placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm ${isLogin ? 'rounded-md' : 'rounded-b-md'}`}
              placeholder="Email address"
            />
          </div>
          {!isLogin && (
            <div className="flex items-center justify-around text-text-secondary">
              <span className="font-medium">Sign up as:</span>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="role" value={UserRole.USER} checked={role === UserRole.USER} onChange={() => setRole(UserRole.USER)} className="form-radio text-primary bg-gray-700 border-gray-600" />
                <span>User</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="role" value={UserRole.ORGANIZER} checked={role === UserRole.ORGANIZER} onChange={() => setRole(UserRole.ORGANIZER)} className="form-radio text-primary bg-gray-700 border-gray-600" />
                <span>Organizer</span>
              </label>
            </div>
          )}

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-hover"
            >
              {isLogin ? 'Sign in' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
