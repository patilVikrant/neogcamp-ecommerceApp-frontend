import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    increaseItemQuantity,
    decreaseItemQuantity,
    removeItemFromCart,
    wishlistItems,
    toggleWishlistItems,
    deliveryCharges,
  } = useBookContext();

  // console.log(cartItems);

  return (
    <div className="bg-body-tertiary py-2">
      <div className="container">
        <h1 className="text-center">
          MY CART (
          {cartItems.length === 0
            ? 0
            : cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
          )
        </h1>
        <div>
          {cartItems.length === 0 ? (
            <p>Cart is empty</p>
          ) : (
            <div className="d-flex justify-content-between">
              <div>
                {cartItems.map((book) => (
                  <div
                    key={book._id}
                    className="card mb-3"
                    style={{ width: "550px" }}
                  >
                    <div className="row g-0">
                      <div className="col-md-6">
                        <img
                          src={book.image}
                          className="img-fluid rounded-start w-100"
                          alt="book-cover-page"
                        />
                      </div>
                      <div className="col-md-6">
                        <div className="card-body">
                          <h5 className="card-title">{book.title}</h5>
                          <p className="card-text">INR {book.price}</p>
                          <p className="card-text">
                            <button
                              className="btn btn-outline-secondary me-3"
                              onClick={() => decreaseItemQuantity(book._id)}
                            >
                              -
                            </button>
                            {book.quantity}
                            <button
                              className="btn btn-outline-secondary ms-3"
                              onClick={() => increaseItemQuantity(book._id)}
                            >
                              +
                            </button>
                          </p>
                          <p className="card-text">
                            <button
                              className="btn btn-secondary w-100"
                              onClick={() => removeItemFromCart(book._id)}
                            >
                              Remove from Cart
                            </button>{" "}
                          </p>
                          <p className="card-text">
                            <button
                              onClick={() => toggleWishlistItems(book._id)}
                              className="btn btn-outline-secondary w-100"
                            >
                              {wishlistItems.find(
                                (item) => item._id == book._id,
                              )
                                ? "Remove from Wishlist"
                                : "Move to Wishlist"}
                            </button>{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-25 p-4 bg-white h-50">
                <h3>PRICE DETAILS</h3>
                <hr />
                <p className="d-flex justify-content-between">
                  <span>
                    Price (
                    {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}{" "}
                    item)
                  </span>{" "}
                  <span>
                    INR{" "}
                    {cartItems.reduce(
                      (acc, curr) => acc + curr.quantity * curr.price,
                      0,
                    )}
                  </span>{" "}
                </p>
                <p className="d-flex justify-content-between">
                  <span>Delivery Charges</span>
                  <span>INR {deliveryCharges}</span>{" "}
                </p>
                <hr />
                <strong className="d-flex justify-content-between">
                  <span>TOTAL AMOUNT</span>{" "}
                  <span>
                    {cartItems.reduce(
                      (acc, curr) => acc + curr.quantity * curr.price,
                      0,
                    ) + deliveryCharges}
                  </span>{" "}
                </strong>
                <hr />
                <Link to="/checkout" className="btn btn-primary w-100">
                  PLACE ORDER
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
