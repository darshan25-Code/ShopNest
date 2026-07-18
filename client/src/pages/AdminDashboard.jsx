import { useEffect, useState } from "react";
import { FaBoxOpen,FaUsers,FaShoppingCart,FaRupeeSign,} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../api/dashboardApi";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await getDashboardStats();
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-10">
        Loading Dashboard...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaBoxOpen className="text-blue-600 text-5xl mb-4" />

          <p className="text-gray-500">
            Total Products
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalProducts}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaUsers className="text-green-600 text-5xl mb-4" />

          <p className="text-gray-500">
            Total Users
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaShoppingCart className="text-orange-500 text-5xl mb-4" />

          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-4xl font-bold mt-2">
            {stats.totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <FaRupeeSign className="text-purple-600 text-5xl mb-4" />

          <p className="text-gray-500">
            Revenue
          </p>

          <h2 className="text-4xl font-bold mt-2">
            ₹{stats.totalRevenue}
          </h2>
        </div>

      </div>

      {/* Quick Links */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <Link
          to="/admin/products"
          className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            Products
          </h2>

          <p className="text-gray-500 mt-2">
            Manage Products
          </p>
        </Link>

        <Link
          to="/admin/users"
          className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            Users
          </h2>

          <p className="text-gray-500 mt-2">
            Manage Users
          </p>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
        >
          <h2 className="text-2xl font-bold">
            Orders
          </h2>

          <p className="text-gray-500 mt-2">
            Manage Orders
          </p>
        </Link>

      </div>
      {/* Recent Orders */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          Recent Orders
        </h2>

        <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Customer</th>
                <th className="p-4">Email</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>

              {stats.recentOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-b text-center"
                >

                  <td className="p-4">
                    {order.user?.name}
                  </td>
                  <td className="p-4">
                    {order.user?.email}
                  </td>
                  <td className="p-4 font-bold">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
                    {order.orderStatus}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;