export const getCartItems = async () => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/cart",
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addItemToCart = async (book) => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/cart",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      },
    );

    if (!response.ok) {
      throw "Failed to add item to the cart";
    }

    const data = await response.json();
    console.log(data);
    return data.item;
  } catch (error) {
    console.log(error);
  }
};

export const increaseItemQuantityInCart = async (id) => {
  try {
    const response = await fetch(
      `https://neogcamp-ecommerce-app-backend.vercel.app/cart/increase/${id}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      throw "Failed to update item";
    }

    const data = await response.json();
    console.log(data);
    return data.item;
  } catch (error) {
    console.log(error);
  }
};

export const decreaseItemQuantityInCart = async (id) => {
  try {
    const response = await fetch(
      `https://neogcamp-ecommerce-app-backend.vercel.app/cart/decrease/${id}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      throw "Failed to update item";
    }

    const data = await response.json();
    console.log(data);
    return data.item;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItemFromCart = async (id) => {
  try {
    const response = await fetch(
      `https://neogcamp-ecommerce-app-backend.vercel.app/cart/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw "Failed to delete item from cart";
    }

    const data = await response.json();
    return data.item;
  } catch (error) {
    console.log(error);
  }
};
