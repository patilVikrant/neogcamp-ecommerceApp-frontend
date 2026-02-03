import useBookContext from "../contexts/BookContext";
import { useParams, useNavigate } from "react-router-dom";
import { editAddress } from "../customHooks/useHandleAddresses";

const EditAddressForm = () => {
  const { setUserProfile, title, setTitle, location, setLocation } =
    useBookContext();
  const { id } = useParams();
  // console.log(userProfile);
  const navigate = useNavigate();

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedAddress = { title, location };
      await editAddress(id, updatedAddress);
      setUserProfile((prevValue) => ({
        ...prevValue,
        address: prevValue.address.map((item) =>
          item._id == id ? { ...item, title: title, location: location } : item,
        ),
      }));
      setTitle("");
      setLocation("");
      navigate("/userprofile");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-body-tertiary py-2">
      <div className="container">
        <form onSubmit={handleEditFormSubmit}>
          <h3>Edit Address</h3>
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
            Edit Address
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAddressForm;
