export const getWishlist = async () => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/wishlist",
    );
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const addToWishlist = async (book) => {
  try {
    const response = await fetch(
      "https://neogcamp-ecommerce-app-backend.vercel.app/wishlist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      },
    );

    if (!response.ok) {
      throw "Failed to add to the wishlist";
    }

    const data = await response.json();
    console.log(data);
    return data.item;
  } catch (error) {
    console.log(error);
  }
};

export const removeFromWishlist = async (id) => {
  try {
    const response = await fetch(
      `https://neogcamp-ecommerce-app-backend.vercel.app/wishlist/${id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw "Failed to delete item from wishlist";
    }

    const data = await response.json();
    return data.item;
  } catch (error) {
    console.log(error);
  }
};
