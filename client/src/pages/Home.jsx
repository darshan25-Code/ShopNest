import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../api/productApi";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Loading Products...
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 sm:p-12 lg:p-16 text-center shadow-lg">
        <h1 className="text-3xl sm:text-5xl font-bold mb-4">
          Welcome to ShopNest
        </h1>

        <p className="text-sm sm:text-lg text-blue-100 max-w-2xl mx-auto">
          Discover premium products at unbeatable prices. Shop smart, shop fast, shop with confidence.
        </p>
      </section>

      {/* Search */}
      <div className="mt-8 relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-300 rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Categories */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((item) => (
          <button
            key={item}
            onClick={() => setCategory(item)}
            className={`whitespace-nowrap px-5 py-2 rounded-full font-medium transition ${
              category === item
                ? "bg-blue-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-blue-100"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Heading */}
      <div className="mt-10 flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Products
        </h2>

        <span className="text-gray-500 text-sm sm:text-base">
          {filteredProducts.length} Products
        </span>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-500">
            No Products Found
          </h2>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;