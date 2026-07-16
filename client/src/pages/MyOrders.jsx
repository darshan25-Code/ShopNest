import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyOrders } from "../api/orderApi";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.orders);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
    <div className="max-w-6xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-10 text-center">
          <h2 className="text-2xl font-semibold">
            No Orders Found
          </h2>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">
                    Order #{order._id.slice(-8)}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <span
                  className={`px-4 py-2 rounded-full text-white ${
                    order.orderStatus === "Pending"
                      ? "bg-yellow-500"
                      : order.orderStatus === "Processing"
                      ? "bg-blue-600"
                      : order.orderStatus === "Shipped"
                      ? "bg-purple-600"
                      : order.orderStatus === "Delivered"
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                >
                  {order.orderStatus}
                </span>
              </div>

              <div className="mt-6">
                {order.products.map((item) => (
                  <div
                    key={item.product}
                    className="flex items-center gap-4 border-b py-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p>
                        Quantity : {item.quantity}
                      </p>
                    </div>

                    <div className="font-bold text-lg">
                      ₹{item.price}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-between items-center">
                <div>
                  <p className="text-gray-500">
                    Payment
                  </p>

                  <h3 className="font-semibold">
                    {order.paymentMethod}
                  </h3>
                </div>

                <div>
                  <p className="text-gray-500">
                    Total
                  </p>

                  <h3 className="text-2xl font-bold text-blue-600">
                    ₹{order.totalAmount}
                  </h3>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to={`/my-orders/${order._id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;