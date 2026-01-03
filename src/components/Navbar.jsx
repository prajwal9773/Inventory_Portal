import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path
      ? 'text-primary-600 border-b-2 border-primary-600'
      : 'text-gray-600 hover:text-primary-600';
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            Inventory Manager
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`font-medium transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              to="/inventory"
              className={`font-medium transition-colors ${isActive('/inventory')}`}
            >
              Inventory
            </Link>
            <Link
              to="/catalogue"
              className={`font-medium transition-colors ${isActive('/catalogue')}`}
            >
              Catalogue
            </Link>
            <Link
              to="/analysis"
              className={`font-medium transition-colors ${isActive('/analysis')}`}
            >
              Analysis
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

