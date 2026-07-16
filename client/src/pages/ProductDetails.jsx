import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaStar, FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProduct, addReview } from "../api/productApi";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await getProduct(id);
      setProduct(res.data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);

    try {
      const res = await addReview(product._id, {
        rating,
        comment,
      });

      toast.success(res.data.message);
      await fetchProduct();
      setRating(5);
      setComment("");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit review."
      );
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">
          Loading Product...
        </h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">
          Product Not Found
        </h1>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : 0;

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
            <h1 className="text-4xl font-bold">{product.name}</h1>

            <button className="text-red-500 hover:scale-110 transition">
              <FaHeart size={28} />
            </button>
          </div>

          <p className="mt-3 text-gray-500">
            Brand:
            <span className="font-semibold text-black ml-2">
              {product.brand}
            </span>
          </p>

          <div className="flex items-center gap-3 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={
                    star <= Math.round(product.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                />
              ))}
            </div>

            <span className="font-semibold">
              {product.rating.toFixed(1)}
            </span>

            <span className="text-gray-500">
              ({product.numReviews} Reviews)
            </span>
          </div>

          <p className="mt-4 text-gray-600">
            Category:
            <span className="font-semibold ml-2">
              {product.category}
            </span>
          </p>

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

          <p className="mt-6 text-gray-600 leading-8">
            {product.description}
          </p>

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

            {/* Customer Reviews */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold mb-8">
          Customer Reviews
        </h2>

        {product.reviews.length === 0 ? (
          <p className="text-gray-500">
            No reviews yet.
          </p>
        ) : (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white shadow rounded-xl p-6"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-lg">
                      {review.name}
                    </h3>

                    <div className="flex items-center gap-1 mt-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={
                            star <= review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }
                        />
                      ))}

                      <span className="ml-2 text-gray-600">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-400">
                    {new Date(
                      review.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

                <p className="mt-4 text-gray-600">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review */}
      <div className="mt-16 bg-white shadow-xl rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-6">
          Write a Review
        </h2>

        {user ? (
          <form
            onSubmit={handleReviewSubmit}
            className="space-y-6"
          >
            <div>
              <label className="font-semibold">
                Rating
              </label>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(Number(e.target.value))
                }
                className="w-full border rounded-lg px-4 py-3 mt-2"
              >
                <option value={5}>
                  ⭐⭐⭐⭐⭐ (5)
                </option>
                <option value={4}>
                  ⭐⭐⭐⭐ (4)
                </option>
                <option value={3}>
                  ⭐⭐⭐ (3)
                </option>
                <option value={2}>
                  ⭐⭐ (2)
                </option>
                <option value={1}>
                  ⭐ (1)
                </option>
              </select>
            </div>

            <div>
              <label className="font-semibold">
                Comment
              </label>

              <textarea
                rows={5}
                value={comment}
                onChange={(e) =>
                  setComment(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-3 mt-2"
                placeholder="Write your review..."
                required
              />
            </div>
                        <button
              type="submit"
              disabled={reviewLoading}
              className={`px-8 py-3 rounded-lg text-white font-semibold transition ${
                reviewLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {reviewLoading
                ? "Submitting..."
                : "Submit Review"}
            </button>
          </form>
        ) : (
          <p className="text-red-500 font-semibold">
            Please login to write a review.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;