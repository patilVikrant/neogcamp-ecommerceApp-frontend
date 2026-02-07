import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";

const Orders = () => {
  const { orders, orderLoading } = useBookContext();
  // console.log(orders);

  return (
    <div className="bg-body-tertiary py-2">
      <div className="container">
        <h1>Orders</h1>
        <div>
          {orderLoading && <p>Loading...</p>}
          {orders && orders.length === 0 ? (
            <p>No orders to show.</p>
          ) : (
            orders &&
            orders.map((order) => (
              <div key={order._id} className="bg-white p-4 rounded my-4">
                <Link
                  to={`/orders/${order._id}`}
                  className="text-decoration-none text-dark"
                >
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex justify-content-between my-2"
                    >
                      <div style={{ width: "100px" }}>
                        <img
                          src={item.image}
                          alt="cover-page-image"
                          className="w-100"
                        />
                      </div>
                      <div style={{ width: "200px" }}>
                        <h3>{item.title}</h3>
                        <p>
                          <strong>Quantity: </strong>
                          {item.quantity}
                        </p>
                      </div>
                      <div style={{ width: "50px" }}>
                        <strong>INR {item.price * item.quantity}</strong>
                      </div>
                      <div>Order Placed on {order.date}</div>
                    </div>
                  ))}
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
