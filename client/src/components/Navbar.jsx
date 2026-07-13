import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Navbar = () => {

    const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopNest
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="hover:text-blue-600 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="hover:text-blue-600 transition"
          >
            Register
          </Link>

          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart size={22} />

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
               {cart.reduce((total, item) => total + item.quantity, 0)}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;