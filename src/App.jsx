import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import InventoryOverview from './pages/InventoryOverview';
import ProductDetails from './pages/ProductDetails';
import CatalogueOverview from './pages/CatalogueOverview';
import Analysis from './pages/Analysis';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inventory" element={<InventoryOverview />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/catalogue" element={<CatalogueOverview />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;

