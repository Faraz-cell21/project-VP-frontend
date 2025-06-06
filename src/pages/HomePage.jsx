// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function HomePage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => setProducts(res.data.data))
            .catch(err => console.error("Failed to fetch products", err));
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Our Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map(product => (
                    <Link
                        to={`/product/${product._id}`}
                        key={product._id}
                        className="block border rounded-lg shadow hover:shadow-lg transition duration-300 p-3"
                    >
                        <img
                            src={product.image?.url}
                            alt={product.name}
                            className="w-full h-48 object-cover rounded mb-2"
                        />
                        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                        <p className="text-gray-600">${product.price.toFixed(2)}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default HomePage;
