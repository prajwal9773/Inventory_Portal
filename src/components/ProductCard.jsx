import { Link } from 'react-router-dom';

/* ------------------------------
   Stock helper (single source)
-------------------------------- */
const getStockStatus = (stock = 0) => {
  if (stock > 10) return { label: 'In Stock', color: 'green' };
  if (stock > 0) return { label: 'Low Stock', color: 'yellow' };
  return { label: 'Out of Stock', color: 'red' };
};

/* ------------------------------
   Product Card Component
-------------------------------- */
const ProductCard = ({ product, variant = 'grid' }) => {
  const stock = product?.stock ?? 0;
  const { label, color } = getStockStatus(stock);
  const image =
    product.thumbnail ||
    product.image ||
    (product.images && product.images[0]);

  /* ==============================
     GRID VIEW (Customer / Catalog)
  =============================== */
  if (variant === 'grid') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        {/* Stock Status Badge */}
        <span
          className={`absolute top-3 right-3 z-10 px-2.5 py-1 text-xs font-semibold rounded-full
            ${color === 'green' && 'bg-green-100 text-green-800'}
            ${color === 'yellow' && 'bg-yellow-100 text-yellow-800'}
            ${color === 'red' && 'bg-red-100 text-red-800'}
          `}
        >
          {label}
        </span>

        {/* Image */}
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">
            {product.title}
          </h3>

          <p className="text-primary-600 font-bold text-xl">
            ${product.price}
          </p>

          {/* Stock Left */}
          <p className="text-sm text-gray-600 mt-1">
            {stock > 0 ? `${stock} left in stock` : 'Currently unavailable'}
          </p>

          <p className="text-sm text-gray-500 capitalize mt-1">
            {product.category}
          </p>
        </div>
      </Link>
    );
  }

  /* ==============================
     TABLE VIEW (Admin / Inventory)
  =============================== */
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors group">
      {/* Product */}
      <td className="px-6 py-4">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center space-x-4 group-hover:text-primary-600 transition-colors"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 group-hover:border-primary-300 transition-colors">
            <img
              src={image}
              alt={product.title}
              className="w-full h-full object-contain p-1"
              loading="lazy"
            />
          </div>
          <span className="font-medium text-gray-800">
            {product.title}
          </span>
        </Link>
      </td>

      {/* Price */}
      <td className="px-6 py-4">
        <span className="text-gray-900 font-semibold">
          ${product.price}
        </span>
      </td>

      {/* Category */}
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-100 capitalize">
          {product.category}
        </span>
      </td>

      {/* Brand */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {product.brand || (
            <span className="text-gray-400 italic">N/A</span>
          )}
        </span>
      </td>

      {/* Stock Status + Count */}
      <td className="px-6 py-4 space-y-1">
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold
            ${color === 'green' && 'bg-green-100 text-green-800 border border-green-200'}
            ${color === 'yellow' && 'bg-yellow-100 text-yellow-800 border border-yellow-200'}
            ${color === 'red' && 'bg-red-100 text-red-800 border border-red-200'}
          `}
        >
          {label}
        </span>

        <div className="text-xs text-gray-500">
          {stock} units available
        </div>
      </td>
    </tr>
  );
};

export default ProductCard;
