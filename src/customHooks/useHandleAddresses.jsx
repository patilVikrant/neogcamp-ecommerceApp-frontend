export const getAllAddresses = async () => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/address",
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addNewAddress = async (newAddress) => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/address",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      },
    );

    if (!response.ok) {
      throw "Failed to add New Address";
    }

    const data = await response.json();
    console.log(data);
    return data.address;
  } catch (error) {
    console.log(error);
  }
};

export const editAddress = async (id, updatedAddress) => {
  try {
    const response = await fetch(
      `https://neogcamp-ecommerce-app-backend.vercel.app/address/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedAddress),
      },
    );

    if (!response.ok) {
      throw "Failed to add New Address";
    }

    const data = await response.json();
    console.log(data);
    return data.address;
  } catch (error) {
    console.log(error);
  }
};

export const removeAddress = async (id) => {
  try {
    const response = await fetch(
      `https://neogcamp-ecommerce-app-backend.vercel.app/address/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw "Failed to delete the address";
    }

    const data = await response.json();
    return data.address;
  } catch (error) {
    console.log(error);
  }
};
