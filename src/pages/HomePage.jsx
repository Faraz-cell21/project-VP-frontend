import { useEffect, useState } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get('http://localhost:5000/api/products', { withCredentials: true })
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product._id} className="border p-3 rounded shadow-md max-w-xs">
          <img
            src={product.image?.url}
            alt={product.name}
            className="w-full h-40 object-cover"
          />
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
              to={`/products/${product._id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
