import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome {user.fullname}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link to="/admin/products" className="bg-green-500 text-white p-4 rounded hover:bg-green-600 text-center">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="bg-purple-500 text-white p-4 rounded hover:bg-purple-600 text-center">
          Manage Orders
        </Link>
        <button
          onClick={() => logout(navigate)}
          className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
