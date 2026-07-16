import { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, clearCart } = useCart();

const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

 const handlePlaceOrder = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    return toast.info("Your cart is empty.");
  }

  try {
    const orderData = {
      products: cart.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),

      shippingAddress,

      paymentMethod: "COD",

      totalAmount,
    };

    const res = await placeOrder(orderData);

    toast.success(res.data.message);

    clearCart();

    navigate("/my-orders");

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message || "Failed to place order."
    );
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

        {/* Shipping Form */}

        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-8">
            Checkout
          </h1>

          <form
            onSubmit={handlePlaceOrder}
            className="space-y-5"
          >

            <div>
              <label className="block font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                name="fullName"
                value={shippingAddress.fullName}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-2">
                Address
              </label>

              <textarea
                rows="3"
                name="address"
                value={shippingAddress.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
                required
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">

              <div>
                <label className="block font-medium mb-2">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={shippingAddress.city}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={shippingAddress.state}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

              <div>
                <label className="block font-medium mb-2">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={shippingAddress.pincode}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-3"
                  required
                />
              </div>

            </div>

            <div>
              <label className="block font-medium mb-2">
                Payment Method
              </label>

              <div className="border rounded-lg px-4 py-3 bg-gray-50">
                Cash On Delivery (COD)
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold"
            >
              Place Order
            </button>

          </form>

        </div>

        {/* Order Summary */}

        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="space-y-5">

            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (

                <div
                  key={item._id}
                  className="flex gap-4 border-b pb-4"
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

                    <p className="text-gray-500">
                      Qty : {item.quantity}
                    </p>

                    <p className="font-bold text-blue-600">
                      ₹{item.price * item.quantity}
                    </p>

                  </div>

                </div>

              ))
            )}

          </div>

          <div className="border-t mt-6 pt-6 space-y-3">

            <div className="flex justify-between">

              <span>Subtotal</span>

              <span>₹{totalAmount}</span>

            </div>

            <div className="flex justify-between">

              <span>Shipping</span>

              <span className="text-green-600">
                FREE
              </span>

            </div>

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span>₹{totalAmount}</span>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;