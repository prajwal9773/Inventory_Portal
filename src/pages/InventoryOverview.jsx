import { useEffect, useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useDebounce } from '../hooks/useDebounce';
import ProductCard from '../components/ProductCard';
import Shimmer from '../components/Shimmer';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';

const InventoryOverview = () => {
  const [searchParams] = useSearchParams();
  const {
    products,
    categories,
    loading,
    error,
    currentPage,
    searchQuery,
    selectedCategory,
    sortBy,
    sortOrder,
    fetchProducts,
    fetchCategories,
    searchProducts,
    setCategory,
    setSort,
    setPage,
    resetFilters,
    getFilteredAndSortedProducts,
  } = useApp();

  const [searchInput, setSearchInput] = useState(searchQuery);
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    fetchCategories();
    
    // Check for category in URL params
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setCategory(categoryParam);
      fetchProducts(1, categoryParam);
    } else {
      fetchProducts(1);
    }
  }, [fetchCategories, fetchProducts, searchParams, setCategory]);


  useEffect(() => {

    if (debouncedSearch) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InventoryOverview.jsx:57',message:'calling searchProducts',data:{debouncedSearch},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      searchProducts(debouncedSearch);
    } else if (!debouncedSearch && !selectedCategory) {
      fetchProducts(1);
    } else {
    }
  }, [debouncedSearch, searchProducts, fetchProducts, selectedCategory]);

  const filteredProducts = getFilteredAndSortedProducts();

  // Memoize stats calculations
  const stats = useMemo(() => {
    const totalProducts = filteredProducts.length;
    const inStockCount = filteredProducts.filter((p) => (p.stock || 0) > 10).length;
    const lowStockCount = filteredProducts.filter((p) => (p.stock || 0) <= 10 && (p.stock || 0) > 0).length;
    const outOfStockCount = filteredProducts.filter((p) => (p.stock || 0) === 0).length;
    return { totalProducts, inStockCount, lowStockCount, outOfStockCount };
  }, [filteredProducts]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setCategory(category);
    if (category) {
      fetchProducts(1, category);
    } else {
      fetchProducts(1);
    }
  };

  const handleSortChange = (e) => {
    const [sortBy, sortOrder] = e.target.value.split('-');
    setSort(sortBy, sortOrder);
  };

  if (error && !products.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <ErrorMessage message={error} onRetry={() => fetchProducts(1)} />
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Inventory Overview
          </h1>
          <p className="text-gray-600 text-lg">
            Manage and explore your product inventory with powerful filtering and search
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">In Stock</p>
                <p className="text-3xl font-bold text-green-600">{stats.inStockCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Low Stock</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.lowStockCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Out of Stock</p>
                <p className="text-3xl font-bold text-red-600">{stats.outOfStockCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Filters & Search</h2>
            {(searchInput || selectedCategory) && (
              <button
                onClick={() => {
                  setSearchInput('');
                  resetFilters();
                  fetchProducts(1);
                }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 px-3 py-1 rounded-lg hover:bg-primary-50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Clear All</span>
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Products
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => {
                    // #region agent log
                    fetch('http://127.0.0.1:7242/ingest/46c57bda-7593-402d-9ff5-5588f609f5fe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'InventoryOverview.jsx:119',message:'search input onChange',data:{newValue:e.target.value,newValueLength:e.target.value.length,oldValue:searchInput,isEmpty:e.target.value.length===0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C,D'})}).catch(()=>{});
                    // #endregion
                    setSearchInput(e.target.value);
                  }}
                  placeholder="Search by product name..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat, index) => {
                    const catSlug = typeof cat === 'string' ? cat : cat.slug;
                    const catName = typeof cat === 'string' ? cat : cat.name;
                    return (
                      <option key={catSlug || index} value={catSlug}>
                        {catName ? catName.charAt(0).toUpperCase() + catName.slice(1) : catSlug}
                      </option>
                    );
                  })}
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <div className="relative">
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={handleSortChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors appearance-none bg-white"
                >
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                  <option value="price-asc">Price (Low to High)</option>
                  <option value="price-desc">Price (High to Low)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{paginatedProducts.length}</span> of{' '}
            <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
          </div>
          {selectedCategory && (
            <div className="text-sm">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Category: {categories.find(c => (typeof c === 'string' ? c : c.slug) === selectedCategory) 
                  ? (typeof categories.find(c => (typeof c === 'string' ? c : c.slug) === selectedCategory) === 'string' 
                    ? categories.find(c => c === selectedCategory) 
                    : categories.find(c => (typeof c === 'string' ? c : c.slug) === selectedCategory).name)
                  : selectedCategory}
              </span>
            </div>
          )}
        </div>

        {/* Products Table */}
        {loading && !products.length ? (
          <div className="grid md:grid-cols-1 gap-4">
            {[...Array(5)].map((_, i) => (
              <Shimmer key={i} type="table" />
            ))}
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Brand
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Stock Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {paginatedProducts.length > 0 ? (
                      paginatedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} variant="table" />
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-12 text-center">
                          <div className="flex flex-col items-center">
                            <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                            </svg>
                            <p className="text-gray-500 text-lg font-medium">No products found</p>
                            <p className="text-gray-400 text-sm mt-1">Try adjusting your filters or search query</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </>
        )}

        {loading && products.length > 0 && (
          <div className="mt-4">
            <LoadingSpinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryOverview;

