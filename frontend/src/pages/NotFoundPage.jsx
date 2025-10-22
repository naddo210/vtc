import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-bold text-purple-600">404</h1>
      <div className="absolute rotate-12 rounded-full bg-purple-100 px-2 text-sm text-purple-800">
        Page Not Found
      </div>
      <div className="mt-5">
        <h3 className="text-2xl font-semibold md:text-3xl mb-8">
          Sorry, the page you're looking for doesn't exist.
        </h3>
        <p className="text-gray-600 mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link
          to="/"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;