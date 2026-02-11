import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const {
    cartItems,
    addToCart,
    wishlistItems,
    wishlistLoading,
    toggleWishlistItems,
  } = useBookContext();

  // console.log(wishlistLoading);
  // console.log(wishlistItems);

  return (
    <div className="bg-body-tertiary py-2 pb-5">
      <div className="container pb-5">
        <h1 className="text-center">
          My Wishlist{" "}
          {!wishlistLoading && <span>({wishlistItems.length})</span>}
        </h1>
        <div className="row g-4 justify-content-center justify-content-md-start">
          {wishlistLoading && <p>Loading...</p>}
          {wishlistItems &&
            (wishlistItems.length === 0 ? (
              <p>Wishlist is empty</p>
            ) : (
              wishlistItems.map((book) => (
                <div
                  key={book._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                  style={{ width: "300px", height: "350px" }}
                >
                  <div className="card h-100">
                    <img
                      src={book.image}
                      className="card-img-top w-100 h-50"
                      alt="book-cover-page"
                    />
                    <span
                      className="badge rounded-pill text-bg-light py-2 position-absolute top-0 end-0 m-2"
                      onClick={() => toggleWishlistItems(book._id)}
                      role="button"
                    >
                      ❤
                    </span>
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>

                      <p className="card-text">
                        <strong>INR {book.price}</strong>
                      </p>
                      {cartItems &&
                      cartItems.find((item) => item._id == book._id) ? (
                        <Link to="/cart" className="btn btn-secondary w-100">
                          Item in cart
                        </Link>
                      ) : (
                        <button
                          className="btn btn-secondary w-100"
                          onClick={() => addToCart(book._id)}
                        >
                          Add to cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
