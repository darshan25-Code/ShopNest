import { useState } from "react";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Home = () => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState("All")

    const categories = [
  "All",
  "Shoes",
  "Watch",
  "Electronics",
  "Accessories",
];

   const filteredProducts = products.filter((product) => {
  const matchesSearch = product.name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchesCategory =
    category === "All" || product.category === category;

  return matchesSearch && matchesCategory;
});

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white rounded-xl p-10 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Welcome to ShopNest
        </h1>

        <p className="text-lg">
          Discover the latest products at the best prices.
        </p>
      </section>

      {/* Search */}
      <div className="mt-10">
        
  <input
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
      

      {/* Categories */}
<div className="mt-8 flex flex-wrap gap-3">
  {categories.map((item) => (
    <button
      key={item}
      onClick={() => setCategory(item)}
      className={`px-4 py-2 rounded-lg transition ${
        category === item
          ? "bg-blue-600 text-white"
          : "bg-gray-200 hover:bg-gray-300"
      }`}
    >
      {item}
    </button>
  ))}
</div>
      {/* Products */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold">
          Products
        </h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
  />
))}
  </div>
      </div>

    </div>
  );
};

export default Home;