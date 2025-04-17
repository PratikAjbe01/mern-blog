import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      // You can fetch user info here if needed
      fetchUserInfo(token);
    } else {
      setIsLoggedIn(false);
    }
  }, [location.pathname]);
  
  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:8000/api/getuser', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setUsername(data.data.fullName || 'User');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsOpen(false);
    navigate('/signin');
  };
  
  const closeMenu = () => {
    setIsOpen(false);
  };
  
  // Define navigation links
  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Blogs', path: '/blogs' },
    ...(isLoggedIn ? [
      { name: 'Create Blog', path: '/create' },
      { name: 'My Dashboard', path: '/user' }
    ] : [])
  ];
  
  // Check if the path is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <>
      {/* Glassmorphic Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white bg-opacity-70 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <svg className="h-8 w-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span className="ml-2 text-xl font-bold text-gray-900">Bloggy</span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {/* Authentication Buttons */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Hi, {username}</span>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-md bg-red-50 text-red-600 text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/signin"
                    className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
            
            {/* Mobile Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                {!isOpen ? (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 transform transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Background overlay */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={closeMenu}
        ></div>
        
        {/* Sidebar panel */}
        <div className={`absolute inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 h-full flex flex-col">
            {/* Close button */}
            <div className="flex items-center justify-end mb-6">
              <button
                onClick={closeMenu}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* User info if logged in */}
            {isLoggedIn && (
              <div className="px-4 py-5 border-b border-gray-200 mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xl font-bold text-blue-600">{username.charAt(0)}</span>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{username}</div>
                    <div className="text-sm font-medium text-gray-500">Logged in</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Links */}
            <div className="flex-1 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={closeMenu}
                  className={`block px-4 py-3 rounded-md text-base font-medium ${
                    isActive(link.path)
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            {/* Authentication Actions */}
            <div className="pt-6 border-t border-gray-200">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-3 rounded-md text-base font-medium text-red-600 bg-red-50 hover:bg-red-100"
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/signin"
                    onClick={closeMenu}
                    className="block w-full px-4 py-3 rounded-md text-center text-base font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={closeMenu}
                    className="block w-full px-4 py-3 rounded-md text-center text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Page content padding to prevent content from being hidden behind navbar */}
      <div className="pt-16"></div>
    </>
  );
}