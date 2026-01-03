import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, getProductsByCategory } from '../services/api';
import ProductCard from '../components/ProductCard';
import Shimmer from '../components/Shimmer';
import ErrorMessage from '../components/ErrorMessage';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const productData = await getProductById(id);
        setProduct(productData);

        // Fetch related products from the same category
        if (productData.category) {
          const related = await getProductsByCategory(productData.category, 7);
          // Filter out the current product
          const filtered = related.filter((p) => p.id !== productData.id).slice(0, 6);
          setRelatedProducts(filtered);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <Shimmer type="product" />
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Product not found
            </h2>
            <Link
              to="/inventory"
              className="text-primary-600 hover:text-primary-700"
            >
              Back to Inventory
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const discountPercentage = product.discountPercentage || 0;
  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.thumbnail 
    ? [product.thumbnail] 
    : product.image 
    ? [product.image] 
    : [];
  const hasMultipleImages = productImages.length > 1;
  // Handle rating as either a number or an object with rate property
  const averageRating = typeof product.rating === 'number' 
    ? product.rating 
    : product.rating?.rate || 0;
  const reviews = product.reviews || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <Link to="/" className="text-primary-600 hover:text-primary-700">
            Home
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link
            to="/inventory"
            className="text-primary-600 hover:text-primary-700"
          >
            Inventory
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            {/* Product Image Slider */}
            <div className="bg-gray-100 rounded-lg flex flex-col items-center justify-center p-8 relative">
              {hasMultipleImages ? (
                <>
                  <div className="relative w-full max-h-96 flex items-center justify-center">
                    <img
                      src={productImages[currentImageIndex]}
                      alt={`${product.title} - Image ${currentImageIndex + 1}`}
                      className="max-w-full max-h-96 object-contain"
                      loading="lazy"
                    />
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                          aria-label="Previous image"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all"
                          aria-label="Next image"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                  {/* Image Thumbnails */}
                  <div className="flex gap-2 mt-4 overflow-x-auto max-w-full">
                    {productImages.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => goToImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                          index === currentImageIndex
                            ? 'border-primary-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <div className="text-sm text-gray-500 mt-2">
                    Image {currentImageIndex + 1} of {productImages.length}
                  </div>
                </>
              ) : (
                <img
                  src={productImages[0] || product.thumbnail}
                  alt={product.title}
                  className="max-w-full max-h-96 object-contain"
                  loading="lazy"
                />
              )}
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              <div className="mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <span className="text-4xl font-bold text-primary-600">
                    ${product.price}
                  </span>
                  {discountPercentage > 0 && (
                    <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                      {discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>

                {/* Stock Information */}
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-500">Stock Available: </span>
                  <span className={`text-lg font-semibold ${
                    (product.stock || 0) > 10
                      ? 'text-green-600'
                      : (product.stock || 0) > 0
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}>
                    {product.stock || 0} units
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Category:
                  </span>
                  <span className="ml-2 text-gray-800 capitalize">
                    {product.category}
                  </span>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Stock Status:
                  </span>
                  <span
                    className={`ml-2 px-3 py-1 rounded-full text-xs font-medium ${
                      (product.stock || 0) > 10
                        ? 'bg-green-100 text-green-800'
                        : (product.stock || 0) > 0
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {(product.stock || 0) > 10
                      ? 'In Stock'
                      : (product.stock || 0) > 0
                      ? 'Low Stock'
                      : 'Out of Stock'}
                  </span>
                </div>
                {product.brand && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">
                      Brand:
                    </span>
                    <span className="ml-2 text-gray-800">{product.brand}</span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* See More Details Section */}
              <div className="border-t pt-4">
                <button
                  onClick={() => setShowMoreDetails(!showMoreDetails)}
                  className="flex items-center justify-between w-full text-left text-primary-600 hover:text-primary-700 font-medium"
                >
                  <span>{showMoreDetails ? 'Hide' : 'See More'} Details</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${showMoreDetails ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {showMoreDetails && (
                  <div className="mt-4 space-y-3 text-sm">
                    {product.dimensions && (
                      <div>
                        <span className="font-medium text-gray-500">Dimensions: </span>
                        <span className="text-gray-800">
                          {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
                        </span>
                      </div>
                    )}
                    {product.weight && (
                      <div>
                        <span className="font-medium text-gray-500">Weight: </span>
                        <span className="text-gray-800">{product.weight} kg</span>
                      </div>
                    )}
                    {product.shippingInformation && (
                      <div>
                        <span className="font-medium text-gray-500">Shipping: </span>
                        <span className="text-gray-800">{product.shippingInformation}</span>
                      </div>
                    )}
                    {product.warrantyInformation && (
                      <div>
                        <span className="font-medium text-gray-500">Warranty: </span>
                        <span className="text-gray-800">{product.warrantyInformation}</span>
                      </div>
                    )}
                    {product.returnPolicy && (
                      <div>
                        <span className="font-medium text-gray-500">Return Policy: </span>
                        <span className="text-gray-800">{product.returnPolicy}</span>
                      </div>
                    )}
                    {product.minimumOrderQuantity && (
                      <div>
                        <span className="font-medium text-gray-500">Minimum Order: </span>
                        <span className="text-gray-800">{product.minimumOrderQuantity} units</span>
                      </div>
                    )}
                    {product.sku && (
                      <div>
                        <span className="font-medium text-gray-500">SKU: </span>
                        <span className="text-gray-800">{product.sku}</span>
                      </div>
                    )}
                    {product.tags && product.tags.length > 0 && (
                      <div>
                        <span className="font-medium text-gray-500">Tags: </span>
                        <span className="text-gray-800">{product.tags.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{review.reviewerName || 'Anonymous'}</h4>
                      <p className="text-sm text-gray-500">
                        {review.date ? new Date(review.date).toLocaleDateString() : ''}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Browse Similar Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  variant="grid"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;

