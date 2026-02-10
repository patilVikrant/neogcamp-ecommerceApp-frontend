import { useParams } from "react-router-dom";
import useBookContext from "../contexts/BookContext";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orders, orderLoading, deliveryCharges } = useBookContext();
  const currentOrder = orders && orders.find((order) => order._id == orderId);
  // console.log(currentOrder);

  return (
    <div className="bg-body-tertiary py-2 pb-5">
      <div className="container pb-5">
        <h1>Order Details</h1>
        {orderLoading && <p>Loading...</p>}
        {currentOrder && (
          <div className="row">
            <div className="bg-white p-4 rounded my-4 col-md-8">
              {currentOrder.items.map((item) => (
                <div className="d-flex gap-5 my-2" key={item._id}>
                  <div style={{ width: "200px" }}>
                    <img
                      className="w-100"
                      src={item.image}
                      alt="book-cover-page"
                    />
                  </div>
                  <div style={{ width: "250px" }}>
                    <h3>{item.title}</h3>
                    <p>
                      <strong>Author: </strong>
                      {item.author}
                    </p>
                    <p>
                      <strong>Category: </strong>
                      {item.category}
                    </p>
                    <p>
                      <strong>Rating: </strong>
                      {item.rating}
                    </p>
                    <p>
                      <strong>Quantity: </strong>
                      {item.quantity}
                    </p>
                    <p className="text-secondary">
                      Ordered on {currentOrder.date} at {currentOrder.time}
                    </p>
                  </div>
                  <div style={{ width: "50px" }}>
                    <strong>INR {item.price * item.quantity}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-white p-4 rounded m-4  col-md-3 h-50">
              <div>
                <h4>Delivery details</h4>
                <p>
                  <strong>{currentOrder.deliveryAddress.title}</strong>
                </p>
                <p>{currentOrder.deliveryAddress.location}</p>
              </div>
              <hr />
              <div>
                <h4>Price Details</h4>
                <p className="d-flex justify-content-between">
                  <span>
                    <strong>Price</strong>
                  </span>
                  <span>
                    INR{" "}
                    {currentOrder.items.reduce(
                      (acc, curr) => acc + curr.quantity * curr.price,
                      0,
                    )}
                  </span>{" "}
                </p>
                <p className="d-flex justify-content-between">
                  <span>
                    <strong>Delivery Charges</strong>
                  </span>
                  <span>INR {deliveryCharges}</span>{" "}
                </p>
                <hr />
                <p>
                  <strong className="d-flex justify-content-between">
                    <span>Total Price:</span>{" "}
                    <span>{currentOrder.totalPrice}</span>
                  </strong>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
