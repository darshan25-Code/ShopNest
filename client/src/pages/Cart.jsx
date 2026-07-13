import { useCart } from "../context/CartContext";

const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-3xl font-bold text-gray-600">
          Your Cart is Empty 🛒
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side - Cart Items */}
        <div className="lg:col-span-2 space-y-6">

          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row gap-6 bg-white rounded-xl shadow-md p-5"
            >
              {/* Product Image */}
              <img
                src={item.image}
                alt={item.name}
                className="w-40 h-40 object-cover rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  {item.category}
                </p>

                <p className="text-blue-600 text-2xl font-bold mt-3">
                  ₹{item.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-5">

                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>

                  <span className="text-xl font-semibold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>

                </div>

                <p className="mt-5 font-semibold text-lg">
                  Subtotal: ₹{item.price * item.quantity}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="mt-5 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
                >
                  Remove
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Right Side - Order Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-24">

          <h2 className="text-2xl font-bold mb-6">
            Order Summary
          </h2>

          <div className="flex justify-between mb-4">
            <span>Total Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span className="text-green-600 font-semibold">
              FREE
            </span>
          </div>

          <div className="flex justify-between mb-6">
            <span>Tax</span>
            <span>₹0</span>
          </div>

          <hr />

          <div className="flex justify-between text-2xl font-bold my-6">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition">
            Proceed to Checkout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Cart;