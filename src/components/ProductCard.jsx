import { Link } from 'react-router-dom';

const ProductCard = ({ product, variant = 'grid' }) => {
  if (variant === 'grid') {
    return (
      <Link
        to={`/product/${product.id}`}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
      >
        <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product.thumbnail || product.image || (product.images && product.images[0])}
            alt={product.title}
            className="w-full h-full object-contain p-4"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-800">
            {product.title}
          </h3>
          <p className="text-primary-600 font-bold text-xl mb-1">
            ${product.price}
          </p>
          <p className="text-sm text-gray-500 capitalize">{product.category}</p>
        </div>
      </Link>
    );
  }

  // Table variant for inventory overview
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4">
        <Link
          to={`/product/${product.id}`}
          className="flex items-center space-x-4 group-hover:text-primary-600 transition-colors"
        >
          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 group-hover:border-primary-300 transition-colors">
            <img
              src={product.thumbnail || product.image || (product.images && product.images[0])}
              alt={product.title}
              className="w-full h-full object-contain p-1"
              loading="lazy"
            />
          </div>
          <span className="font-medium text-gray-800 group-hover:text-primary-600 transition-colors">
            {product.title}
          </span>
        </Link>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-900 font-semibold">${product.price}</span>
      </td>
      <td className="px-6 py-4">
        <span className="inline-flex items-center px-3 py-1 rounded-md text-sm text-gray-700 bg-gray-100 capitalize">
          {product.category}
        </span>
      </td>
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-gray-700 capitalize">
          {product.brand || <span className="text-gray-400 italic">N/A</span>}
        </span>
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${
            (product.stock || 0) > 10
              ? 'bg-green-100 text-green-800 border border-green-200'
              : (product.stock || 0) > 0
              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {(product.stock || 0) > 10
            ? 'In Stock'
            : (product.stock || 0) > 0
            ? 'Low Stock'
            : 'Out of Stock'}
        </span>
      </td>
    </tr>
  );
};

export default ProductCard;

