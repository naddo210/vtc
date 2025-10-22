import React from 'react';
import { Link } from 'react-router-dom';

const AuthErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-8 rounded-lg">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-8 w-8 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-red-800">Authentication Error</h3>
          </div>
        </div>
      </div>
      
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
      <p className="text-gray-600 mb-8 max-w-md">
        You don't have permission to access this page. Please log in with an administrator account to continue.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/login"
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Go to Login
        </Link>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default AuthErrorPage;