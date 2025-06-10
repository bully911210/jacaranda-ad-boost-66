
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

interface KBLayoutProps {
  children: ReactNode;
  title?: string;
  showBackButton?: boolean;
}

const KBLayout = ({ children, title = "Knowledge Base", showBackButton = false }: KBLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {showBackButton && (
                <Link
                  to="/kb"
                  className="flex items-center text-jacaranda hover:text-jacaranda-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to KB
                </Link>
              )}
              <h1 className="font-montserrat font-bold text-xl text-gray-900">{title}</h1>
            </div>
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-jacaranda transition-colors"
            >
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-600">
          <p className="font-open-sans text-sm">
            © 2025 Jacaranda Media Knowledge Base. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default KBLayout;
