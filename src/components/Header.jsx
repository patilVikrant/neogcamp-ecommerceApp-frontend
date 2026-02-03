import { NavLink } from "react-router-dom";
import useBookContext from "../contexts/BookContext";

const Header = () => {
  const { searchText, setSearchText, setSearchQuery } = useBookContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(searchText);
  };
  return (
    <header className="bg-body-tertiary">
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            bookCart
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/books">
                  All Books
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">
                  Wishlist
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  Cart
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/userprofile">
                  <img
                    src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                    alt="user-icon"
                    style={{ width: "25px" }}
                  />
                </NavLink>
              </li>
            </ul>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
              <input
                className="form-control me-2"
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
