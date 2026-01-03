import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { getAllCategories, getProductsByCategory } from '../services/api';
import Shimmer from '../components/Shimmer';
import ErrorMessage from '../components/ErrorMessage';

const CatalogueOverview = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const cats = await getAllCategories();
        setCategories(cats);
        
        // Fetch products for all categories in parallel for better performance
        const productPromises = cats.map(async (category) => {
          try {
            const categorySlug = typeof category === 'string' ? category : category.slug;
            const products = await getProductsByCategory(categorySlug, 1);
            return { categorySlug, product: products.length > 0 ? products[0] : null };
          } catch (err) {
            console.error(`Error fetching products for ${category}:`, err);
            return { categorySlug: typeof category === 'string' ? category : category.slug, product: null };
          }
        });
        
        const results = await Promise.all(productPromises);
        const productsMap = {};
        results.forEach(({ categorySlug, product }) => {
          if (product) {
            productsMap[categorySlug] = product;
          }
        });
        setCategoryProducts(productsMap);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {

    const categorySlug = typeof category === 'string' ? category : category.slug;
    navigate(`/inventory?category=${encodeURIComponent(categorySlug)}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Shimmer key={i} type="card" />
            ))}
          </div>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Catalogue Overview
          </h1>
          <p className="text-gray-600">
            Browse products by category. Click on a category to view all products
            in that category.
          </p>
        </div>

        {/* Categories Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const categorySlug = typeof category === 'string' ? category : category.slug;
              const categoryName = typeof category === 'string' ? category : category.name;
              const sampleProduct = categoryProducts[categorySlug];
              return (
                <div
                  key={categorySlug}
                  onClick={() => handleCategoryClick(category)}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                >
                  {sampleProduct ? (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                      <img
                        src={sampleProduct.thumbnail || sampleProduct.image || (sampleProduct.images && sampleProduct.images[0])}
                        alt={categoryName}
                        className="w-full h-full object-contain p-4"
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                      <svg
                        className="w-16 h-16 text-primary-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 capitalize mb-2">
                      {categoryName}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Click to view all products in this category
                    </p>
                    <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                      View Products →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogueOverview;

