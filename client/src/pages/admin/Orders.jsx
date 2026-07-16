import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/orderApi";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await updateOrderStatus(id, status);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id
            ? {
                ...order,
                orderStatus: status,
              }
            : order
        )
      );

      toast.success(res.data.message);
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update status."
      );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Processing":
        return "bg-blue-100 text-blue-700";

      case "Shipped":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-2xl mt-10">
        Loading Orders...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Manage Orders
      </h1>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr className="text-gray-700">

              <th className="p-4">Order ID</th>

              <th className="p-4">Customer</th>

              <th className="p-4">Email</th>

              <th className="p-4">Products</th>

              <th className="p-4">Total</th>

              <th className="p-4">Payment</th>

              <th className="p-4">Status</th>

              <th className="p-4">Ordered On</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b text-center hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium">
                  #{order._id.slice(-8)}
                </td>

                <td className="p-4">
                  {order.user?.name}
                </td>

                <td className="p-4">
                  {order.user?.email}
                </td>

                <td className="p-4">
                  {order.products.length}
                </td>

                <td className="p-4 font-bold text-blue-600">
                  ₹{order.totalAmount}
                </td>

                <td className="p-4">
                  {order.paymentMethod}
                </td>

                <td className="p-4">

                  <div
                    className={`inline-block px-4 py-1 rounded-full font-semibold mb-3 ${getStatusColor(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus}
                  </div>

                  <select
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange(
                        order._id,
                        e.target.value
                      )
                    }
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>

                </td>

                <td className="p-4">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Orders;