import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleOrder } from "../api/orderApi";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getSingleOrder(id);
      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Loading Order...
      </h1>
    );
  }

  if (!order) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Order Not Found
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold">
            Order Details
          </h1>

          <p className="text-gray-500 mt-2">
            Order ID : {order._id}
          </p>

          <p className="text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="flex gap-4">
          <span
            className={`px-5 py-2 rounded-full text-white font-semibold ${
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

          <span
            className={`px-5 py-2 rounded-full text-white font-semibold ${
              order.paymentStatus === "Paid"
                ? "bg-green-600"
                : "bg-red-500"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Shipping Information
          </h2>

          <div className="space-y-3">
            <p>
              <span className="font-semibold">Full Name :</span>{" "}
              {order.shippingAddress.fullName}
            </p>

            <p>
              <span className="font-semibold">Phone :</span>{" "}
              {order.shippingAddress.phone}
            </p>

            <p>
              <span className="font-semibold">Address :</span>{" "}
              {order.shippingAddress.address}
            </p>

            <p>
              <span className="font-semibold">City :</span>{" "}
              {order.shippingAddress.city}
            </p>

            <p>
              <span className="font-semibold">State :</span>{" "}
              {order.shippingAddress.state}
            </p>

            <p>
              <span className="font-semibold">Pincode :</span>{" "}
              {order.shippingAddress.pincode}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Payment</span>
              <span className="font-semibold">
                {order.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Items</span>
              <span className="font-semibold">
                {order.products.length}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-blue-600">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-6">
          Ordered Products
        </h2>

        <div className="space-y-6">
                      {order.products.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center gap-6 border rounded-xl p-5 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-28 h-28 object-cover rounded-lg"
              />

              <div className="flex-1 w-full">
                <h3 className="text-xl font-semibold">
                  {item.name}
                </h3>

                <p className="text-gray-500 mt-2">
                  Quantity : {item.quantity}
                </p>

                <p className="text-blue-600 font-bold mt-2">
                  ₹{item.price}
                </p>

                <p className="text-gray-500 mt-2">
                  Subtotal : ₹{item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t mt-8 pt-6">
          <div className="flex justify-between text-lg mb-3">
            <span>Total Items</span>
            <span>{order.products.length}</span>
          </div>

          <div className="flex justify-between text-lg mb-3">
            <span>Payment Method</span>
            <span>{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between text-lg mb-3">
            <span>Payment Status</span>
            <span
              className={`font-semibold ${
                order.paymentStatus === "Paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>

          <div className="flex justify-between text-3xl font-bold mt-6">
            <span>Total Amount</span>
            <span className="text-blue-600">
              ₹{order.totalAmount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;