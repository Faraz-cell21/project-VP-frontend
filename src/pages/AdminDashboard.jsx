import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext)
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
      </div>
    </div>
  );
};

export default AdminDashboard;
