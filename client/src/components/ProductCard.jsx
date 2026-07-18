import { Link } from "react-router-dom";
import { FaStar, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const discount =
    product.oldPrice && product.oldPrice > product.price
      ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
      : 0;

  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 30;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition duration-300 overflow-hidden">
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-56 sm:h-64 object-cover transition-transform duration-500 hover:scale-105"
          />

          {discount > 0 && (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{discount}% OFF
            </span>
          )}

          {isNew && (
            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              NEW
            </span>
          )}

          <div className="pointer-events-none absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition duration-300 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 shadow-lg">
              <FaEye className="text-blue-600" size={20} />
            </div>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm text-blue-600 font-medium">{product.brand}</p>

        <h2 className="mt-2 text-lg font-bold text-gray-800 line-clamp-2 min-h-[56px]">
          {product.name}
        </h2>

        <p className="text-sm text-gray-500 mt-1">{product.category}</p>

        <div className="flex items-center gap-1 mt-3">
          <FaStar className="text-yellow-400" />
          <span className="font-semibold">{product.rating.toFixed(1)}</span>
          <span className="text-gray-500 text-sm">
            ({product.numReviews})
          </span>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <span className="text-2xl font-bold text-blue-600">
            ₹{product.price}
          </span>

          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          )}
        </div>

        <div className="mt-4">
          {product.stock > 0 ? (
            <span className="text-green-600 font-medium">
              ✔ {product.stock} In Stock
            </span>
          ) : (
            <span className="text-red-600 font-medium">
              ✖ Out Of Stock
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          disabled={product.stock === 0}
          className={`mt-6 w-full py-3 rounded-xl font-semibold transition ${
            product.stock > 0
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {product.stock > 0 ? "Add To Cart" : "Out Of Stock"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;