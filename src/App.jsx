import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import ProductListing from "./pages/ProductListing";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
import EditAddressForm from "./pages/EditAddressForm";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import { BookProvider } from "./contexts/BookContext";

function App() {
  return (
    <BookProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<ProductListing />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/books/:id" element={<ProductDetails />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/userprofile/edit/:id" element={<EditAddressForm />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:orderId" element={<OrderDetails />} />
        </Routes>

        <Footer />
      </Router>
    </BookProvider>
  );
}

export default App;
