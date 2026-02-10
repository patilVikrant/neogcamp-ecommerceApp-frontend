import { useParams, Link, useNavigate } from "react-router-dom";
import useBookContext from "../contexts/BookContext";

const ProductDetails = () => {
  const { id } = useParams();
  //   console.log(id);
  const {
    books,
    loading,
    cartItems,
    setCartItems,
    addToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    wishlistItems,
    toggleWishlistItems,
  } = useBookContext();

  const navigate = useNavigate();

  const requiredBook = books && books.find((book) => book._id == id);
  //   console.log(requiredBook);
  const isAddedToCart = cartItems && cartItems.find((book) => book._id == id);
  const isBookAddedToWishlist =
    wishlistItems && wishlistItems.find((book) => book._id == id);

  const handleBuyNow = async () => {
    cartItems.forEach((item) => removeItemFromCart(item._id, true));
    await addToCart(requiredBook._id, true);
    setCartItems([{ ...requiredBook, quantity: 1 }]);
    navigate("/cart");
  };

  return (
    <div className="bg-body-tertiary py-2 pb-5">
      <div className="container pb-5">
        {loading && <p>Loading...</p>}
        {requiredBook && (
          <div className="d-flex gap-4 bg-white row">
            <div
              className="p-2 col-md-4 position-relative m-2"
              style={{ width: "300px", height: "400px" }}
            >
              <img
                src={requiredBook.image}
                className="rounded w-100 h-50"
                alt="Book-cover-page"
              />
              <span
                className="badge rounded-pill text-bg-light py-2 position-absolute top-0 end-0 m-2"
                onClick={() => toggleWishlistItems(requiredBook._id)}
                role="button"
              >
                {isBookAddedToWishlist ? "❤" : "🤍"}
              </span>
              <div>
                <button
                  className="btn btn-primary w-100 my-2"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </button>
                {isAddedToCart ? (
                  <Link to="/cart" className="btn btn-secondary w-100">
                    Item in cart
                  </Link>
                ) : (
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => addToCart(requiredBook._id)}
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
            <div className="p-2 col-md-8">
              <h1>{requiredBook.title}</h1>
              <p>Rating: {requiredBook.rating}</p>
              <p>Author: {requiredBook.author}</p>
              <p>Category: {requiredBook.category}</p>
              <p>Publication House: {requiredBook.publicationHouse}</p>
              {isAddedToCart ? (
                <p>
                  <button
                    className="btn btn-outline-secondary me-3"
                    onClick={() => decreaseItemQuantity(id)}
                  >
                    -
                  </button>
                  {isAddedToCart.quantity}
                  <button
                    className="btn btn-outline-secondary ms-3"
                    onClick={() => increaseItemQuantity(id)}
                  >
                    +
                  </button>
                </p>
              ) : (
                ""
              )}
              <hr />
              <h2>INR {requiredBook.price}</h2>
              <hr />
              <p>Description</p>
              <p>{requiredBook.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
