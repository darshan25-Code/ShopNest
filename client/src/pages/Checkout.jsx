import { useState } from "react";
import { useCart } from "../context/CartContext";
import { placeOrder } from "../api/orderApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createRazorpayOrder,
  verifyPayment,
} from "../api/paymentApi";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("COD");

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

  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const handleOnlinePayment = async () => {
  const scriptLoaded = await loadRazorpayScript();

  if (!scriptLoaded) {
    alert("Razorpay SDK failed to load.");
    return;
  }

  try {
    const { data } = await createRazorpayOrder(totalAmount);
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.order.amount,
      currency: data.order.currency,
      name: "ShopNest",
      description: "Order Payment",
      order_id: data.order.id,

     handler: async function (response) {
  try {
    const verifyRes = await verifyPayment({
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
    });

    if (!verifyRes.data.success) {
      return toast.error("Payment verification failed.");
    }

    const orderData = {
      products: cart.map((item) => ({
        product: item._id,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
      })),
      shippingAddress,
      paymentMethod: "Online",
      paymentStatus: "Paid",
      razorpayPaymentId: response.razorpay_payment_id,
      razorpayOrderId: response.razorpay_order_id,
      totalAmount,
    };

    const res = await placeOrder(orderData);

    toast.success("Payment Successful!");
    clearCart()
    navigate("/my-orders");

  } catch (error) {
    console.log(error);

    toast.error("Payment verification failed.");
  }
},
     prefill: {
  name: user?.name || "",
  email: user?.email || "",
  contact: shippingAddress.phone,
},

      theme: {
        color: "#2563eb",
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  } catch (error) {
    console.log(error);
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
  <label className="block font-medium mb-3">
    Payment Method
  </label>

  <div className="space-y-3">
    <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
      <input
        type="radio"
        name="paymentMethod"
        value="COD"
        checked={paymentMethod === "COD"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      <span>Cash On Delivery (COD)</span>
    </label>

    <label className="flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-50">
      <input
        type="radio"
        name="paymentMethod"
        value="Online"
        checked={paymentMethod === "Online"}
        onChange={(e) => setPaymentMethod(e.target.value)}
      />

      <span>Pay Online (Razorpay)</span>
    </label>

  </div>
</div>

            <button
  type={paymentMethod === "COD" ? "submit" : "button"}
  onClick={
    paymentMethod === "Online"
      ? handleOnlinePayment
      : undefined
  }
  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold">
  {paymentMethod === "COD"
    ? "Place Order"
    : "Pay with Razorpay"}
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
                  className="flex gap-4 border-b pb-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"/>

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