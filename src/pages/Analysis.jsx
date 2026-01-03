import { useEffect, useState, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, getAllCategories } from '../services/api';
import Shimmer from '../components/Shimmer';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

// Lazy load chart components
const UnsoldItemsChart = lazy(() => import('../components/UnsoldItemsChart'));
const LowStockChart = lazy(() => import('../components/LowStockChart'));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

const Analysis = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(0, 0),
          getAllCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate data for charts
  const chartData = useMemo(() => {
    if (!products.length) return { unsoldByCategory: [], lowStockByCategory: [], lowStockItems: [] };

    // Group products by category
    const categoryMap = {};
    products.forEach((product) => {
      const category = product.category || 'uncategorized';
      if (!categoryMap[category]) {
        categoryMap[category] = {
          category,
          totalStock: 0,
          lowStockCount: 0,
          unsoldCount: 0, // Items with stock > 0
        };
      }
      categoryMap[category].totalStock += product.stock || 0;
      if ((product.stock || 0) >0) {
        categoryMap[category].unsoldCount += 1;
      }
      if ((product.stock || 0) <= 10 && (product.stock || 0) > 0) {
        categoryMap[category].lowStockCount += 1;
      }
    });

    // Convert to arrays for charts - preserve original category slug for navigation
    const unsoldByCategory = Object.values(categoryMap)
      .map((item) => ({
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g, ' '),
        value: item.unsoldCount,
        categorySlug: item.category, // Preserve original slug for navigation
      }))
      .sort((a, b) => b.value - a.value);

    const lowStockByCategory = Object.values(categoryMap)
      .filter((item) => item.lowStockCount > 0)
      .map((item) => ({
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1).replace(/-/g, ' '),
        value: item.lowStockCount,
        categorySlug: item.category, // Preserve original slug for navigation
      }))
      .sort((a, b) => b.value - a.value);

    // Get individual low stock items
    const lowStockItems = products
      .filter((p) => (p.stock || 0) <= 10 && (p.stock || 0) > 0)
      .sort((a, b) => (a.stock || 0) - (b.stock || 0))
      .slice(0, 10)
      .map((p) => ({
        name: p.title.length > 30 ? p.title.substring(0, 30) + '...' : p.title,
        stock: p.stock || 0,
        category: p.category || 'uncategorized',
      }));

    return { unsoldByCategory, lowStockByCategory, lowStockItems };
  }, [products]);

  // Handle bar click - navigate to inventory with category filter
  // Recharts Bar onClick receives: (data, index, e) where data is the data point
  const handleBarClick = (data) => {
    if (data && data.categorySlug) {
      navigate(`/inventory?category=${encodeURIComponent(data.categorySlug)}`);
    }
  };

  if (loading && !products.length) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Shimmer type="card" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <ErrorMessage message={error} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Analysis</h1>
          <p className="text-gray-600">
            Visual insights into your inventory: unsold items by category and low stock alerts
          </p>
        </div>

        {loading && products.length > 0 && (
          <div className="mb-4">
            <LoadingSpinner />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Unsold Items by Category - Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Unsold Items by Category
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Number of items with stock available, grouped by category
            </p>
            {chartData.unsoldByCategory.length > 0 ? (
              <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
                <UnsoldItemsChart 
                  data={chartData.unsoldByCategory} 
                  onBarClick={handleBarClick}
                />
              </Suspense>
            ) : (
              <div className="text-center py-12 text-gray-500">No data available</div>
            )}
            <p className="text-xs text-gray-400 mt-2 text-center">
              💡 Click on a bar to view products in that category
            </p>
          </div>

          {/* Unsold Items by Category - Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Low Stock Items by Category
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Items with stock ≤ 10 units, grouped by category (needs refilling)
            </p>
            {chartData.lowStockByCategory.length > 0 ? (
              <Suspense fallback={<div className="h-96 flex items-center justify-center"><LoadingSpinner /></div>}>
                <LowStockChart 
                  data={chartData.lowStockByCategory} 
                  onBarClick={handleBarClick}
                />
              </Suspense>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No low stock items found. All items have sufficient stock!
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2 text-center">
              💡 Click on a bar to view products in that category
            </p>
          </div>
        
        </div>

    
        {/* Top Low Stock Items Table */}
        {chartData.lowStockItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Top 10 Items Requiring Immediate Attention
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Products with the lowest stock levels (≤ 10 units)
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock Available
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {chartData.lowStockItems.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-800">{item.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600 capitalize">
                        {item.category.replace(/-/g, ' ')}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-red-600">
                        {item.stock} units
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                          Low Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Summary Statistics */}
        <div className="grid md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Total Products</div>
            <div className="text-3xl font-bold text-gray-900">{products.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Total Categories</div>
            <div className="text-3xl font-bold text-gray-900">{categories.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Items with Stock</div>
            <div className="text-3xl font-bold text-green-600">
              {products.filter((p) => (p.stock || 0) > 0).length}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="text-sm text-gray-500 mb-1">Low Stock Items</div>
            <div className="text-3xl font-bold text-red-600">
              {products.filter((p) => (p.stock || 0) <= 10 && (p.stock || 0) > 0).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

