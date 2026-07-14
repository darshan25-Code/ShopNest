import { FaBoxOpen, FaUsers, FaShoppingCart, FaRupeeSign } from "react-icons/fa";
import {Link} from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Products */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <FaBoxOpen className="text-blue-600 text-5xl mb-4" />

          <h2 className="text-gray-500">
            Total Products
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            0
          </h1>
        </div>

        {/* Users */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <FaUsers className="text-green-600 text-5xl mb-4" />

          <h2 className="text-gray-500">
            Total Users
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            0
          </h1>
        </div>

        {/* Orders */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <FaShoppingCart className="text-orange-500 text-5xl mb-4" />

          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            0
          </h1>
        </div>

        {/* Revenue */}
        <div className="bg-white shadow-lg rounded-xl p-6">
          <FaRupeeSign className="text-purple-600 text-5xl mb-4" />

          <h2 className="text-gray-500">
            Revenue
          </h2>

          <h1 className="text-4xl font-bold mt-2">
            ₹0
          </h1>
        </div>
        <Link
  to="/admin/products"
  className="inline-block mt-10 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
>
  Manage Products
</Link>

      </div>

    </div>
  );
};

export default AdminDashboard;