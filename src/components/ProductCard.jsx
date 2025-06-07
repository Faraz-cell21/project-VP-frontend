import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="border p-3 rounded shadow-md max-w-xs">
      <img src={product.image?.url} alt={product.name} className="w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-500 mb-2">PKR {product.price}</p>
      <div className="flex justify-between items-center">
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
        >
          Add to Cart
        </button>
        <Link
          to={`/product/${product._id}`}
          className="text-blue-500 hover:underline text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
