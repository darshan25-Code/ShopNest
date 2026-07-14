import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../../api/productApi";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await deleteProduct(id);

      alert(res.data.message);

      // Refresh product list
      fetchProducts();

    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">

      {loading ? (
        <h2 className="text-center text-xl">
          Loading Products...
        </h2>
      ) : (
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">

          <div className="flex justify-between items-center mb-6 p-6">
            <h1 className="text-4xl font-bold">
              Manage Products
            </h1>

            <Link
              to="/admin/products/add"
              className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
            >
              + Add Product
            </Link>
          </div>

          <table className="w-full">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-4">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>

              {products.map((product) => (

                <tr
                  key={product._id}
                  className="border-b"
                >

                  <td className="p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">
                    {product.stock}
                  </td>

                  <td className="p-4 flex gap-3">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default Products;