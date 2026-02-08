import useBookContext from "../contexts/BookContext";
import { Link } from "react-router-dom";
import {
  addNewAddress,
  removeAddress,
} from "../customHooks/useHandleAddresses";

const UserProfile = () => {
  const {
    userProfile,
    setUserProfile,
    title,
    setTitle,
    location,
    setLocation,
    addressLoading,
  } = useBookContext();

  console.log(userProfile);
  // console.log(title);
  // console.log(location);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const address = { title, location };
      const newAddress = await addNewAddress(address);
      setUserProfile((prevValue) => ({
        ...prevValue,
        address: [...prevValue.address, newAddress],
      }));

      setTitle("");
      setLocation("");
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAddress = async (id) => {
    try {
      const deletedAddress = await removeAddress(id);
      console.log(deletedAddress);
      setUserProfile((prevValue) => ({
        ...prevValue,
        address: prevValue.address.filter((item) => item._id != id),
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const editFormDefaultValue = (id) => {
    const userTitle = userProfile.address.find((item) => item._id == id).title;
    const userLocation = userProfile.address.find(
      (item) => item._id == id,
    ).location;
    setTitle(userTitle);
    setLocation(userLocation);
  };

  return (
    <div className="bg-body-tertiary py-2">
      <div className="container">
        <h1>User Profile</h1>
        {addressLoading && <p>Loading...</p>}
        {!addressLoading && (
          <div>
            <h3>Name: {userProfile.name}</h3>
            <p>
              <strong>EmailId: </strong>
              {userProfile.emailId}
            </p>
            <p>
              <strong>Contact Number: </strong>
              {userProfile.phoneNumber}
            </p>

            <div>
              <strong>Addresses:</strong>
              <ul className="list-unstyled my-2">
                {userProfile.address.map((item) => (
                  <li key={item._id}>
                    <strong>Title: </strong>
                    {item.title} <br />
                    <strong>Location: </strong>
                    {item.location} <br />
                    {!item.isDefault && (
                      <>
                        <Link
                          className="btn btn-info"
                          to={`/userprofile/edit/${item._id}`}
                          onClick={() => editFormDefaultValue(item._id)}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() => deleteAddress(item._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    <hr />
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link to="/orders" className="btn btn-info">
                My Orders
              </Link>
            </div>
            <hr />
          </div>
        )}
        <div>
          <form onSubmit={handleSubmit}>
            <h3>Add New Address</h3>
            <label className="form-label my-2">Title:</label>
            <input
              className="form-control my-2"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label className="form-label my-2">Location:</label>
            <input
              className="form-control my-2"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary my-2">
              Add Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
