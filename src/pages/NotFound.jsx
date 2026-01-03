import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl p-10 text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-6 w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
          <svg
            className="w-7 h-7 text-primary-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold text-gray-900 mb-3">
          404
        </h1>

        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Page not found
        </h2>

        <p className="text-gray-600 mb-8 leading-relaxed">
          The page you’re trying to reach doesn’t exist or has been moved.
          Please check the URL or return to a safe location.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition"
          >
            Go to Home
          </Link>

          <Link
            to="/inventory"
            className="px-6 py-3 rounded-lg border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            Open Dashboard
          </Link>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-400">
          Inventory Management System
        </p>
      </div>
    </div>
  );
};

export default NotFound;
