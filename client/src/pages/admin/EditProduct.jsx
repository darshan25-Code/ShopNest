import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  updateProduct,
} from "../../api/productApi";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    price: "",
    oldPrice: "",
    description: "",
    image: "",
    stock: "",
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await getProduct(id);

      setFormData({
        name: res.data.product.name,
        brand: res.data.product.brand,
        category: res.data.product.category,
        price: res.data.product.price,
        oldPrice: res.data.product.oldPrice,
        description: res.data.product.description,
        image: res.data.product.image,
        stock: res.data.product.stock,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProduct(id, formData);

      alert(res.data.message);

      navigate("/admin/products");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to update product."
      );
    }
  };

  if (loading) {
    return (
      <h1 className="text-center text-3xl mt-20">
        Loading Product...
      </h1>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">

      <div className="bg-white shadow-lg rounded-xl p-8">

        <h1 className="text-3xl font-bold mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="number"
            name="oldPrice"
            placeholder="Old Price"
            value={formData.oldPrice}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
            required
          />

          <button
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
          >
            Update Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default EditProduct;