import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar, FaHeart, FaTruck, FaShieldAlt } from "react-icons/fa";
import { MdReplay } from "react-icons/md";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { getProduct, addReview } from "../api/productApi";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    for (let i = 0; i < quantity; i++) addToCart(product);
    toast.success("Product added to cart");
  };
  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/checkout");
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);

    try {
      const res = await addReview(product._id, { rating, comment });
      toast.success(res.data.message);
      fetchProduct();
      setRating(5);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review.");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="animate-pulse text-3xl font-bold text-blue-600">Loading Product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const discount = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid lg:grid-cols-2 gap-12">

        <div className="lg:sticky lg:top-24 h-fit">
          <div className="overflow-hidden rounded-3xl shadow-2xl bg-white">
            <img
              src={product.image}
              alt={product.name}
              className="w-full rounded-3xl transition duration-700 hover:scale-105"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-between items-start gap-4">
            <div>
              <p className="text-blue-600 font-semibold">{product.brand}</p>
              <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            </div>


          </div>

          <div className="flex items-center gap-3 mt-5">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={star <= Math.round(product.rating) ? "text-yellow-400" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="font-semibold">{product.rating.toFixed(1)}</span>
            <span className="text-gray-500">({product.numReviews} Reviews)</span>
          </div>

          <p className="mt-5 text-gray-500">
            Category :
            <span className="font-semibold text-black ml-2">{product.category}</span>
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8">
            <h2 className="text-4xl font-bold text-blue-600">₹{product.price}</h2>

            {product.oldPrice && (
              <>
                <span className="text-xl text-gray-400 line-through">₹{product.oldPrice}</span>
                <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mt-8 text-gray-600 leading-8">{product.description}</p>

          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            <div className="flex items-center gap-3">
              <FaTruck className="text-green-600" />
              <span>Free Delivery</span>
            </div>

            <div className="flex items-center gap-3">
              <MdReplay className="text-blue-600 text-xl" />
              <span>7-Day Return</span>
            </div>

            <div className="flex items-center gap-3">
              <FaShieldAlt className="text-purple-600" />
              <span>Secure Payment</span>
            </div>

            <div className="flex items-center gap-3">
              <span>📦</span>
              {product.stock > 5 ? (
                <span className="text-green-600 font-semibold">In Stock ({product.stock})</span>
              ) : (
                <span className="text-red-600 font-semibold">Only {product.stock} Left</span>
              )}
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-semibold mb-4">Quantity</h3>

            <div className="flex items-center border rounded-xl overflow-hidden w-fit shadow">
              <button
                onClick={() => setQuantity(prev => prev > 1 ? prev - 1 : 1)}
                className="w-12 h-12 hover:bg-gray-100 text-xl"
              >
                −
              </button>

              <span className="w-14 text-center font-bold text-lg">{quantity}</span>

              <button
                onClick={() => setQuantity(prev => prev < product.stock ? prev + 1 : prev)}
                className="w-12 h-12 hover:bg-gray-100 text-xl"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl font-semibold transition ${product.stock > 0
                  ? "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
                }`}
            >
              🛒 Add To Cart
            </button>

            <button
              onClick={handleBuyNow}
              disabled={product.stock === 0}
              className={`flex-1 py-4 rounded-xl font-semibold transition ${product.stock > 0
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-gray-400 cursor-not-allowed text-white"
                }`}
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
      {/* Customer Reviews */}
      <div className="mt-20">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-8">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <span className="text-gray-500">{product.numReviews} Reviews</span>
        </div>

        {product.reviews.length === 0 ? (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-2xl font-bold">No Reviews Yet</h3>
            <p className="text-gray-500 mt-2">Be the first customer to review this product.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div
                key={review._id}
                className="bg-white rounded-3xl shadow-md hover:shadow-xl transition duration-300 p-6"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xl shrink-0">
                      {review.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">{review.name}</h3>

                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar
                            key={star}
                            className={star <= review.rating ? "text-yellow-400" : "text-gray-300"}
                          />
                        ))}
                        <span className="ml-2 text-gray-500 text-sm">{review.rating}/5</span>
                      </div>

                      <p className="text-green-600 text-sm font-medium mt-2">
                        ✔ Verified Purchase
                      </p>
                    </div>
                  </div>

                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="mt-5 border-t pt-5">
                  <p className="text-gray-600 leading-7">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review */}
      <div className="mt-20 bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-8">Write a Review</h2>

        {user ? (
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div>
              <label className="font-semibold block mb-2">Rating</label>

              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className={`py-3 rounded-xl border transition ${rating === star
                        ? "bg-yellow-400 border-yellow-400 text-white"
                        : "hover:bg-gray-100"
                      }`}
                  >
                    ⭐ {star}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="font-semibold block mb-2">Comment</label>
              <textarea
                rows={5}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience about this product..."
                className="w-full border rounded-xl px-4 py-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={reviewLoading}
              className={`w-full py-4 rounded-xl font-semibold text-white transition ${reviewLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.01]"
                }`}
            >
              {reviewLoading ? "Submitting Review..." : "Submit Review"}
            </button>
          </form>
        ) : (
          <div className="text-center py-10">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-2xl font-bold">Login Required</h3>
            <p className="text-gray-500 mt-2">
              Please login to write a review for this product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;