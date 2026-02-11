import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { topRatedBooks, loading } = useBookContext();
  // console.log(books);
  // console.log(topRatedBooks);
  // console.log(loading);

  return (
    <div className="bg-body-tertiary py-2 pb-5">
      <div className="container pb-5">
        <div className=" col-xxl-8 py-3">
          {" "}
          <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
            {" "}
            <div className="col-10 col-sm-8 col-lg-6">
              {" "}
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg?t=st=1767855879~exp=1767859479~hmac=2b8faa4f8d59eef312ec73f8549c44496d6a4222c7c02bafb4de535478790058&w=1060"
                className="d-block mx-lg-auto img-fluid"
                alt="Book-image"
                width="700"
                height="500"
                loading="lazy"
              />{" "}
            </div>{" "}
            <div className="col-lg-6">
              {" "}
              <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                There is nothing better than to read
              </h1>{" "}
              <p className="lead">
                Find the perfect gift for everyone on your list
              </p>{" "}
              <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                {" "}
                <Link
                  to="/books"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Shop Now
                </Link>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
        <div className="my-4">
          <h2>Top Rated Books</h2>
          <div className="row g-4 py-4 justify-content-center justify-content-md-start">
            {loading && <p>Loading...</p>}
            {topRatedBooks &&
              topRatedBooks.map((book) => (
                <Link
                  key={book._id}
                  to={`/books/${book._id}`}
                  className="col-12 col-sm-5 col-md-4 col-lg-2 text-decoration-none text-dark"
                  style={{ width: "175px", height: "275px" }}
                >
                  <div className="card h-100">
                    <img
                      src={book.image}
                      className="card-img-top w-100 h-50"
                      alt="book-cover-page"
                    />
                    <div className="card-body">
                      <h5 className="card-title">{book.title}</h5>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
