import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext"
import axios from "axios";

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/products/${productId}`)
            .then(res => setProduct(res.data.data))
            .catch(err => console.error("Product not found", err));
    }, [productId]);

    if (!product) return <div className="p-4 text-center">Loading product...</div>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <img
                src={product.image?.url}
                alt={product.name}
                className="w-full h-96 object-contain rounded shadow mb-4"
            />
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-green-700 font-semibold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700">Status: {product.inStock}</p>
            <p className="mt-4">{product.description || "No description available."}</p>
        </div>
    );
}

export default ProductDetail;
