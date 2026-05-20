import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductById } from "../redux/feature/Product.jsx";
import { addReview, deleteReview, getReviewId } from "../redux/feature/Review.jsx";
import {addProductToCart} from "../redux/feature/Cart.jsx"
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const dispatch = useDispatch();
    const navigate = useNavigate();
  const { id } = useParams();

  // ✅ PRODUCT STATE
  const { singleProduct: product, loading, error } = useSelector(
    (state) => state.product
  );

  // ✅ REVIEW STATE (IMPORTANT FIX)
  const { reviews } = useSelector((state) => state.review || { reviews: [] });

  console.log(reviews)

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
const [aiSummary, setAiSummary] = useState("");
const [summaryLoading, setSummaryLoading] = useState(false);
const [showSummary, setShowSummary] = useState(false);


  // 🔥 FETCH PRODUCT + REVIEWS
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getReviewId(id));
  }, [id, dispatch]);







  // 🔥 SET DEFAULT IMAGE
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0].url);
    }
  }, [product]);


const handleReviewSummary = async () => {
  try {
    setSummaryLoading(true);

    const res = await fetch(
      `https://ecommerce-backend1-117w.onrender.com/api/v1/ai/review-summary/${id}`
    );

    const data = await res.json();

    setAiSummary(data.result.summary);

    setShowSummary(true);

  } catch (err) {
    console.error(err);
  } finally {
    setSummaryLoading(false);
  }
};

  // 🔥 ADD TO CART
  let handleQty=()=>{
    console.log("click me")
      dispatch(addProductToCart({id,qty: Number(quantity)}))
       .unwrap()
            .then(() => {
              console.log("i move to /cart page")
              navigate("/cart");
    }).catch((err) =>
              console.error("Fetching cart products failed:", err)
            );
  }

   
  

  // 🔥 ADD REVIEW
  const handleAddReview = () => {
    if (!rating || !comment) {
      alert("Please fill all fields");
      return;
    }

    dispatch(addReview({ id, reviewData: { rating, comment } }))
      .unwrap()
      .then(() => {
        dispatch(getReviewId(id)); // ✅ refresh reviews
        setRating(0);
        setComment("");
      });
  };

  // 🔥 DELETE REVIEW
  const handleDeleteReview = (reviewId) => {
    dispatch(deleteReview({ productId: id, reviewId }))
      .unwrap()
      .then(() => {
        dispatch(getReviewId(id)); // ✅ refresh reviews
      });
  };

  // 🔥 LOADING / ERROR STATES
  if (loading) return <h1 className="text-center mt-10">Loading...</h1>;
  if (error) return <h1 className="text-red-500 text-center">{error}</h1>;
  if (!product) return <h1 className="text-center mt-10">No product found</h1>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 mt-30">

      {/* ================= PRODUCT ================= */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-2 gap-10">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={selectedImage || "https://via.placeholder.com/400"}
            className="w-full h-[400px] object-contain rounded-xl "
          />

          <div className="flex gap-3 mt-4">
            {product?.images?.map((img, i) => (
              <img
                key={i}
                src={img?.url}
                onClick={() => setSelectedImage(img?.url)}
                className="w-16 h-16 border rounded cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product?.name}</h1>

          <p className="text-2xl text-green-600 font-semibold">
            ₹ {product?.price}
          </p>

          <p className="text-gray-600">{product?.description}</p>

          {/* SIZE */}
          <div>
            <p className="font-semibold mb-2">Select Size</p>
            <div className="flex gap-2">
              {product?.size?.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded ${
                    selectedSize === size ? "bg-black text-white" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="flex items-center gap-3">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleQty}
            className="bg-black text-white py-3 rounded"
          >
            Add To Cart
          </button>
        </div>
      </div>

      {/* ================= REVIEWS ================= */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow">

        {/* <h2 className="text-2xl font-semibold mb-5">Customer Reviews</h2> */}

        <div className="flex justify-between items-center mb-5">
  <h2 className="text-2xl font-semibold">
    Customer Reviews
  </h2>

  <button
     onClick={handleReviewSummary}
    className="border px-4 py-2 rounded-full hover:bg-gray-100"
  >
    🧠 AI Summary
  </button>
</div>

{showSummary && (
  <div className="bg-gray-100 p-4 rounded-xl mb-6">
    <h3 className="font-semibold mb-2">
      AI Review Summary
    </h3>

    {summaryLoading ? (
      <p>Generating summary...</p>
    ) : (
      <p>{aiSummary}</p>
    )}
  </div>
)}

        {/* SHOW REVIEWS */}
        {reviews?.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev._id} className="border-b py-4 flex justify-between">
              <div>
                <p className="font-semibold">{rev?.userId?.email}</p>

                <p className="text-yellow-500">
                  {"⭐".repeat(rev?.rating)}
                </p>

                <p className="text-gray-600">{rev?.comment}</p>
              </div>

              <button
                onClick={() => handleDeleteReview(rev._id)}
                className="text-red-500"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}

        {/* ADD REVIEW */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Write Review</h3>

          {/* STAR RATING */}
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((num) => (
              <span
                key={num}
                onClick={() => setRating(num)}
                className={`text-2xl cursor-pointer ${
                  num <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          {/* COMMENT */}
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-2 rounded mb-3"
            placeholder="Write review..."
          />

          <button
            onClick={handleAddReview}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;