import { useCart } from '../context/CartContext';
import { useState } from 'react';
import axios from 'axios';

function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNo: '',
    address: { street: '' },
    city: '',
    province: '',
    postalCode: '',
    paymentMethod: 'cod',
    deliveryNotes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'street') {
      setFormData((prev) => ({
        ...prev,
        address: { street: value }
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleOrderSubmit = async () => {
    try {
      const items = cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity
      }));

      const payload = {
        ...formData,
        items
      };

      const res = await axios.post('http://localhost:5000/api/order', payload, {
        withCredentials: true
      });

      alert('✅ Order placed successfully!');
      clearCart();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {cartItems.map(item => (
              <div
                key={item.product._id}
                className="flex items-center justify-between border p-4 rounded shadow-sm"
              >
                <div>
                  <p className="font-semibold">{item.product.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: Rs. {item.product.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
            <p className="font-bold text-lg">Total: Rs. {totalAmount}</p>
          </div>

          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Full Name"
              className="border p-2 rounded"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded"
              required
            />
            <input
              type="tel"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              placeholder="Phone Number"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street Address"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              placeholder="Province"
              className="border p-2 rounded"
              required
            />
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              placeholder="Postal Code"
              className="border p-2 rounded"
              required
            />
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="bank">Bank Transfer</option>
              {/* Add more if needed */}
            </select>
            <textarea
              name="deliveryNotes"
              value={formData.deliveryNotes}
              onChange={handleChange}
              placeholder="Delivery Notes (Optional)"
              className="border p-2 rounded col-span-full"
            />
          </div>

          <button
            onClick={handleOrderSubmit}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
