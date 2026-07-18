import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    setMenuOpen(false);
    navigate("/");
  };

  const navClass = ({ isActive }) =>
    `transition hover:text-blue-600 ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}`;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ShopNest
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={navClass}>Home</NavLink>

          {user && (
            <NavLink to="/my-orders" className={navClass}>
              My Orders
            </NavLink>
          )}

          {user?.role === "admin" && (
            <NavLink to="/admin" className={navClass}>
              Admin
            </NavLink>
          )}

          {!user ? (
            <>
              <NavLink to="/login" className={navClass}>Login</NavLink>
              <NavLink to="/register" className={navClass}>Register</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/profile" className={navClass}>
                Hello, {user.name}
              </NavLink>

              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition"
              >
                Logout
              </button>
            </>
          )}

          <NavLink to="/cart" className="relative">
            <FaShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>
        </div>

        {/* Mobile Right */}
        <div className="md:hidden flex items-center gap-5">
          <NavLink to="/cart" className="relative">
            <FaShoppingCart size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </NavLink>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
     {menuOpen && (
  <div className="md:hidden border-t bg-white shadow-lg">
    <div className="flex flex-col p-4 gap-4">

      <NavLink
        to="/"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) =>
          `block transition hover:text-blue-600 ${
            isActive ? "text-blue-600 font-semibold" : "text-gray-700"
          }`
        }
      >
        Home
      </NavLink>

      {user && (
        <NavLink
          to="/my-orders"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `block transition hover:text-blue-600 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          My Orders
        </NavLink>
      )}

      {user?.role === "admin" && (
        <NavLink
          to="/admin"
          onClick={() => setMenuOpen(false)}
          className={({ isActive }) =>
            `block transition hover:text-blue-600 ${
              isActive ? "text-blue-600 font-semibold" : "text-gray-700"
            }`
          }
        >
          Admin
        </NavLink>
      )}

      {!user ? (
        <>
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block transition hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Login
          </NavLink>

          <NavLink
            to="/register"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block transition hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Register
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block transition hover:text-blue-600 ${
                isActive ? "text-blue-600 font-semibold" : "text-gray-700"
              }`
            }
          >
            Profile
          </NavLink>

          <button
            onClick={handleLogout}
            className="block w-full text-left text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
)}
    </nav>
  );
};

export default Navbar;