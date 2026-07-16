import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ShopNest
        </Link>

        <div className="flex items-center gap-6">

          <Link
            to="/"
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>

          {user && (
            <Link
              to="/my-orders"
              className="hover:text-blue-600 transition"
            >
              My Orders
            </Link>
          )}

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="hover:text-blue-600 transition"
            >
              Admin
            </Link>
          )}

          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="font-medium hover:text-blue-600 transition"
              >
                Hello, {user.name} 👋
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          )}

          <Link
            to="/cart"
            className="relative"
          >
            <FaShoppingCart size={22} />

            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
              {totalItems}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;