import { Link } from "react-router-dom";
import useBookContext from "../contexts/BookContext";
import { useState } from "react";

const ProductListing = () => {
  const {
    books,
    addToCart,
    wishlistItems,
    toggleWishlistItems,
    searchQuery,
    setSearchQuery,
    setSearchText,
  } = useBookContext();
  const [filterDisplay, setFilterDisplay] = useState(false);
  const [priceRange, setPriceRange] = useState("");
  const [itemCategory, setItemCategory] = useState([]);
  const [itemRating, setItemRating] = useState("");

  console.log(books);

  // console.log(wishlistItems);

  const priceChangeHandler = (event) => {
    setPriceRange(event.target.value);
  };
  // console.log(priceRange);
  const categoryChangeHandler = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      setItemCategory((prevValue) => [...prevValue, value]);
    } else {
      setItemCategory((prevValue) =>
        prevValue.filter((category) => category != value),
      );
    }
  };

  // console.log(itemRating);

  const ratingChangeHandler = (event) => {
    setItemRating(event.target.value);
  };

  const resetFilters = () => {
    setPriceRange("");
    setItemCategory([]);
    setItemRating("");
  };

  const filteredBooks =
    priceRange || itemCategory.length !== 0 || itemRating
      ? books.filter((book) => {
          const bookPrice = priceRange ? book.price < Number(priceRange) : true;

          const bookCategory =
            itemCategory.length !== 0
              ? itemCategory.includes(book.category)
              : true;

          const bookRating = itemRating
            ? book.rating >= Number(itemRating)
            : true;

          return bookPrice && bookCategory && bookRating;
        })
      : books;
  // console.log(filteredBooks);

  const showAllBooks = () => {
    setSearchQuery("");
    setSearchText("");
  };

  return (
    <div className="bg-body-tertiary py-2">
      <div className="container">
        <h1>All Books</h1>
        {searchQuery && (
          <button onClick={showAllBooks} className="btn btn-primary my-2">
            Show All books
          </button>
        )}
        {!searchQuery && (
          <button
            className="btn btn-secondary my-2"
            onClick={() => setFilterDisplay(!filterDisplay)}
          >
            {filterDisplay ? "Clear" : "Filters"}
          </button>
        )}

        <div>
          {filterDisplay && (
            <div className="position-absolute w-25 p-4 bg-light z-3 rounded bg-opacity-75">
              <h2>Filters</h2>
              <button className="btn btn-secondary my-3" onClick={resetFilters}>
                Reset
              </button>
              <div>
                <label htmlFor="price" className="form-label">
                  <h3>Price</h3>
                </label>
                <br />
                <input
                  id="price"
                  type="range"
                  value={priceRange}
                  onChange={priceChangeHandler}
                  className="form-range"
                  min="400"
                  max="1800"
                />
                <h3>{priceRange}</h3>
                <div className="form-check">
                  <h3>Category</h3>

                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="business-category"
                    value="Business"
                    checked={itemCategory.includes("Business")}
                    onChange={categoryChangeHandler}
                  />
                  <label
                    htmlFor="business-category"
                    className="form-check-label"
                  >
                    Business
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="finance-category"
                    value="Finance"
                    checked={itemCategory.includes("Finance")}
                    onChange={categoryChangeHandler}
                  />
                  <label
                    htmlFor="finance-category"
                    className="form-check-label"
                  >
                    Finance
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="programming-category"
                    value="Programming"
                    checked={itemCategory.includes("Programming")}
                    onChange={categoryChangeHandler}
                  />
                  <label
                    htmlFor="programming-category"
                    className="form-check-label"
                  >
                    Programming
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="scifi-category"
                    value="Sci-Fi"
                    checked={itemCategory.includes("Sci-Fi")}
                    onChange={categoryChangeHandler}
                  />
                  <label htmlFor="scifi-category" className="form-check-label">
                    Sci-Fi
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="selfHelp-category"
                    value="Self-Help"
                    checked={itemCategory.includes("Self-Help")}
                    onChange={categoryChangeHandler}
                  />
                  <label
                    htmlFor="selfHelp-category"
                    className="form-check-label"
                  >
                    Self-Help
                  </label>
                  <br />
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="science-category"
                    value="Science"
                    checked={itemCategory.includes("Science")}
                    onChange={categoryChangeHandler}
                  />
                  <label
                    htmlFor="science-category"
                    className="form-check-label"
                  >
                    Science
                  </label>
                </div>
                <div className="form-check">
                  <h3>Rating</h3>

                  <input
                    type="radio"
                    className="form-check-input"
                    name="rating"
                    value="4"
                    checked={itemRating === "4"}
                    onChange={ratingChangeHandler}
                  />
                  <label className="form-check-label">4 stars & above</label>
                  <br />
                  <input
                    type="radio"
                    className="form-check-input"
                    name="rating"
                    value="3"
                    checked={itemRating === "3"}
                    onChange={ratingChangeHandler}
                  />
                  <label className="form-check-label">3 stars & above</label>
                  <br />
                  <input
                    type="radio"
                    className="form-check-input"
                    name="rating"
                    value="2"
                    checked={itemRating === "2"}
                    onChange={ratingChangeHandler}
                  />
                  <label className="form-check-label">2 stars & above</label>
                </div>
              </div>
            </div>
          )}
          <div className={`d-flex flex-wrap gap-4`}>
            {filteredBooks ? (
              filteredBooks.length !== 0 ? (
                filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="card"
                    style={{ width: "350px", height: "450px" }}
                  >
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
                      {wishlistItems.find((item) => item._id == book._id)
                        ? "❤"
                        : "🤍"}
                    </span>
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                      <p className="card-text">
                        <strong>Author: </strong>
                        {book.author}
                      </p>
                      <p className="card-text">
                        <strong>Rating: </strong>
                        {book.rating}
                      </p>
                      <p className="card-text">
                        <strong>Price: </strong>INR {book.price}
                      </p>
                      <Link
                        to={`/books/${book._id}`}
                        className="btn btn-primary"
                      >
                        Details
                      </Link>
                      <button
                        className="btn btn-outline-secondary mx-2"
                        onClick={() => addToCart(book._id)}
                      >
                        Add to cart
                      </button>
                      <ToastContainer />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <p>No books matched your search</p>
                </>
              )
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
