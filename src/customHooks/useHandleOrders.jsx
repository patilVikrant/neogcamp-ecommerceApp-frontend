export const getAllOrders = async () => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/order",
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addNewOrder = async (newOrder) => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      },
    );

    if (!response.ok) {
      throw "Failed to add New Order";
    }

    const data = await response.json();
    console.log(data);
    return data.order;
  } catch (error) {
    console.log(error);
  }
};
