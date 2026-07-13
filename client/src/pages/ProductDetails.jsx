import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { useCart } from "../context/CartContext";
import products from "../data/products";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) / product.oldPrice) * 100
      )
    : 0;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Product Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Product Details */}
        <div>

          <div className="flex justify-between items-center">

            <h1 className="text-4xl font-bold">
              {product.name}
            </h1>

            <button className="text-red-500 hover:scale-110 transition">
              <FaHeart size={28} />
            </button>

          </div>

          {/* Brand */}
          <p className="mt-3 text-gray-500">
            Brand:
            <span className="font-semibold text-black ml-2">
              {product.brand}
            </span>
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-4">

            <div className="flex text-yellow-400">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <span className="font-medium">
              {product.rating}
            </span>

            <span className="text-gray-500">
              ({product.reviews} Reviews)
            </span>

          </div>

          {/* Category */}
          <p className="mt-4 text-gray-600">
            Category:
            <span className="font-semibold ml-2">
              {product.category}
            </span>
          </p>

          {/* Price */}
          <div className="flex items-center gap-4 mt-6">

            <h2 className="text-4xl font-bold text-blue-600">
              ₹{product.price}
            </h2>

            {product.oldPrice && (
              <>
                <span className="line-through text-gray-500">
                  ₹{product.oldPrice}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {discount}% OFF
                </span>
              </>
            )}

          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

          {/* Features */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3">
              <FaTruck className="text-green-600" />
              <span>Free Delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <MdReplay className="text-blue-600 text-xl" />
              <span>7-Day Return Policy</span>
            </div>

            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-purple-600" />
              <span>Secure Payment</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xl">📦</span>

              {product.stock > 5 ? (
                <span className="text-green-600 font-semibold">
                  In Stock ({product.stock} Available)
                </span>
              ) : (
                <span className="text-red-600 font-semibold">
                  Only {product.stock} Left!
                </span>
              )}

            </div>

          </div>

          {/* Quantity */}
          <div className="mt-10">

            <h3 className="font-semibold mb-3">
              Quantity
            </h3>

            <div className="flex items-center gap-5">

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev > 1 ? prev - 1 : 1
                  )
                }
                className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                -
              </button>

              <span className="text-xl font-bold">
                {quantity}
              </span>

              <button
                onClick={() =>
                  setQuantity((prev) =>
                    prev < product.stock
                      ? prev + 1
                      : prev
                  )
                }
                className="w-10 h-10 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                +
              </button>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex gap-5 mt-10">

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl text-white font-semibold transition ${
                product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              🛒 Add to Cart
            </button>

            <button className="flex-1 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition">
              ⚡ Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ProductDetails;