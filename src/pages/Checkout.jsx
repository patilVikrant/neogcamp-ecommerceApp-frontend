import { useState } from "react";
import useBookContext from "../contexts/BookContext";
import { useNavigate, Link } from "react-router-dom";
import { addNewOrder } from "../customHooks/useHandleOrders";
import { toast } from "react-toastify";

const Checkout = () => {
  const {
    cartItems,
    cartLoading,
    setCartItems,
    removeItemFromCart,
    deliveryCharges,
    userProfile,
    setOrders,
  } = useBookContext();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  // console.log(deliveryAddress);
  const navigate = useNavigate();

  //   console.log(userProfile.address);

  const totalNumberOfItems =
    cartItems && cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalPrice =
    cartItems &&
    cartItems.reduce((acc, curr) => acc + curr.quantity * curr.price, 0) +
      deliveryCharges;
  const addresses = userProfile.address;
  // console.log(totalNumberOfItems);
  // console.log(totalPrice);

  const handleAddressSelect = (id) => {
    const address = addresses.find((add) => add._id === id);
    setDeliveryAddress(address);
  };

  const handleCheckout = async () => {
    if (!deliveryAddress) {
      alert("Please select Delivery address");
      return;
    }

    const order = {
      items: cartItems.map((book) => ({
        title: book.title,
        author: book.author,
        price: book.price,
        rating: book.rating,
        category: book.category,
        publicationHouse: book.publicationHouse,
        image: book.image,
        description: book.description,
        quantity: book.quantity,
      })),
      totalPrice: totalPrice,
      numberOfItems: totalNumberOfItems,
      deliveryAddress: {
        title: deliveryAddress.title,
        location: deliveryAddress.location,
      },
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
    };

    const newOrder = await addNewOrder(order);

    setOrders((prevValue) => [...prevValue, newOrder]);
    toast.success("Order placed successfully!");

    setTimeout(() => {
      cartItems.forEach((item) => removeItemFromCart(item._id, true));
      setCartItems([]);
      navigate("/orders");
    }, 3000);
  };

  return (
    <div className="bg-body-tertiary py-2 pb-5">
      <div className="container position-relative pb-5">
        <h1>Checkout</h1>
        {cartLoading && <p>Loading...</p>}
        {!cartLoading &&
          (cartItems.length !== 0 ? (
            <>
              <div>
                {cartItems.map((book) => (
                  <div
                    key={book._id}
                    className="d-flex justify-content-between"
                  >
                    <div>
                      <h3>{book.title}</h3>
                      <p>Quantity: {book.quantity}</p>
                    </div>
                    <div>
                      <strong>INR {book.quantity * book.price}</strong>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-end">
                <hr />
                <p>
                  <strong>Delivery Charges: INR {deliveryCharges}</strong>
                </p>
                <hr />
                <p>
                  <strong>Total Price: INR {totalPrice}</strong>
                </p>
              </div>
              <div>
                <h4>Choose Delivery Address:</h4>
                {addresses.map((add) => (
                  <div
                    onClick={() => handleAddressSelect(add._id)}
                    key={add._id}
                    role="button"
                  >
                    <strong>{add.title}</strong>
                    <p>{add.location}</p>
                    <hr />
                  </div>
                ))}
              </div>
              <div>
                <Link className="btn btn-outline-info my-2" to="/userprofile">
                  Add New Address
                </Link>
              </div>
              {deliveryAddress && (
                <div>
                  <strong>Delivery Address:</strong>
                  {
                    <div>
                      <strong>{deliveryAddress.title}</strong>
                      <p>{deliveryAddress.location}</p>
                    </div>
                  }
                </div>
              )}
              <button className="btn btn-primary my-2" onClick={handleCheckout}>
                Checkout
              </button>
            </>
          ) : (
            <p>Cart is empty</p>
          ))}
      </div>
    </div>
  );
};

export default Checkout;
