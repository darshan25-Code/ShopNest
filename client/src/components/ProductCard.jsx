import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {

    const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      
      {/* Product Image & Info */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-56 object-cover"
        />

        <div className="p-4">
          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <h2 className="text-xl font-semibold mt-2 line-clamp-1">
            {product.name}
          </h2>

          <p className="text-2xl font-bold text-blue-600 mt-3">
            ₹{product.price}
          </p>

           <p
    className={`mt-2 text-sm font-medium ${
      product.stock > 0 ? "text-green-600" : "text-red-600"
    }`}
  >
    {product.stock > 0 ? "In Stock" : "Out of Stock"}
  </p>
        </div>
      </Link>

      {/* Button */}
      <div className="px-4 pb-4">
        <button
  onClick={() => {
  console.log("Button Clicked");
  addToCart(product);
}}
  disabled={product.stock === 0}
  className={`w-full py-2 rounded-lg transition duration-300 ${
    product.stock > 0
      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
      : "bg-gray-400 text-white cursor-not-allowed"
  }`}
>
  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
</button>
      </div>
    </div>
  );
};

export default ProductCard;