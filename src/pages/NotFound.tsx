
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="font-montserrat font-bold text-6xl text-gray-900 mb-4">404</h1>
          <h2 className="font-montserrat font-bold text-2xl text-gray-700 mb-4">
            Page Not Found
          </h2>
          <p className="font-open-sans text-gray-600 mb-8 max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or doesn't exist.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-jacaranda text-white font-open-sans font-semibold rounded-lg hover:bg-jacaranda-700 transition-colors"
          >
            <Home className="w-4 h-4 mr-2" />
            Go to Homepage
          </Link>
          
          <div>
            <Link
              to="/kb"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-open-sans font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Browse Knowledge Base
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
