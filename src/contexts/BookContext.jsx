/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import useBooksData from "../customHooks/useBooksData";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../customHooks/useHandleWishlist";

import {
  getCartItems,
  addItemToCart,
  increaseItemQuantityInCart,
  decreaseItemQuantityInCart,
  deleteItemFromCart,
} from "../customHooks/useHandleCart";

import { getAllAddresses } from "../customHooks/useHandleAddresses";

import { getAllOrders } from "../customHooks/useHandleOrders";

const BookContext = createContext();

const useBookContext = () => useContext(BookContext);

export default useBookContext;

const userData = {
  name: "Vishal Naik",
  emailId: "abc@xyz.com",
  phoneNumber: "9012345678",
  address: [
    {
      _id: "6977c15d3b00a6095b3d58de",
      title: "Vishal home",
      location:
        "Bldg no. 18, sector - 12, Opp Thane Railway station, Thane west, 400705",
      isDefault: true,
    },
  ],
};

export function BookProvider({ children }) {
  const [cartItems, setCartItems] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState(null);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(userData);
  const [orders, setOrders] = useState(null);
  const [orderLoading, setOrderLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchText, setSearchText] = useState("");
  const deliveryCharges = 199;
  const { data: booksData, loading } = useBooksData(
    "https://neogcamp-ecommerce-app-backend.vercel.app/books",
  );

  // console.log(booksData);
  // console.log(loading);

  // console.log(orders);

  const topRatedBooks =
    booksData && booksData.filter((book) => book.rating > 4);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        setCartLoading(true);
        const data = await getCartItems();
        setCartItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setCartLoading(false);
      }
    };

    const loadWishlist = async () => {
      try {
        setWishlistLoading(true);
        const data = await getWishlist();
        setWishlistItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setWishlistLoading(false);
      }
    };

    const loadAddresses = async () => {
      try {
        const data = await getAllAddresses();
        setUserProfile((prevValue) => ({
          ...prevValue,
          address: [...data],
        }));
      } catch (error) {
        console.log(error);
      }
    };

    const loadOrders = async () => {
      try {
        setOrderLoading(true);
        const data = await getAllOrders();
        setOrders(data);
      } catch (error) {
        console.log(error);
      } finally {
        setOrderLoading(false);
      }
    };

    loadCartItems();
    loadWishlist();
    loadAddresses();
    loadOrders();
  }, []);

  const addItemToWishList = async (book) => {
    try {
      const addedItem = await addToWishlist(book);
      setWishlistItems((prevValue) => [...prevValue, addedItem]);
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromWishlist = async (id) => {
    try {
      const deletedItem = await removeFromWishlist(id);
      console.log(deletedItem);

      setWishlistItems((prevValue) => {
        return prevValue.filter((book) => book._id !== id);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (id) => {
    try {
      const bookToAdd = booksData.find((book) => book._id === id);
      const addedItem = await addItemToCart(bookToAdd);
      setCartItems((prevValue) => {
        const isItemAdded = prevValue.find((book) => book._id === id);
        if (!isItemAdded) {
          return [...prevValue, addedItem];
        } else {
          return prevValue.map((book) => (book._id === id ? addedItem : book));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const increaseItemQuantity = async (id) => {
    try {
      const updatedItem = await increaseItemQuantityInCart(id);
      console.log(updatedItem);
      setCartItems((prevValue) =>
        prevValue.map((book) =>
          book._id == id ? { ...book, quantity: book.quantity + 1 } : book,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const decreaseItemQuantity = async (id) => {
    try {
      const updatedItem = await decreaseItemQuantityInCart(id);
      console.log(updatedItem);
      setCartItems((prevValue) =>
        prevValue
          .map((book) =>
            book._id == id ? { ...book, quantity: book.quantity - 1 } : book,
          )
          .filter((book) => book.quantity > 0),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      const deletedItem = await deleteItemFromCart(id);
      console.log(deletedItem);
      setCartItems((prevValue) => prevValue.filter((book) => book._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  function toggleWishlistItems(id) {
    const toggleItem = booksData.find((book) => book._id === id);
    // console.log(toggleItem);

    const isItemAddedToWishlist = wishlistItems.find((book) => book._id === id);
    // console.log(isItemAddedToWishlist);

    if (!isItemAddedToWishlist) {
      addItemToWishList(toggleItem);
    } else {
      removeItemFromWishlist(id);
    }
  }

  const books = searchQuery
    ? booksData.filter(
        (book) => book.title.toLocaleLowerCase() === searchQuery.toLowerCase(),
      )
    : booksData;

  return (
    <BookContext.Provider
      value={{
        books,
        topRatedBooks,
        loading,
        cartItems,
        cartLoading,
        setCartItems,
        addToCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        removeItemFromCart,
        wishlistItems,
        wishlistLoading,
        setWishlistItems,
        toggleWishlistItems,
        userData,
        userProfile,
        setUserProfile,
        title,
        setTitle,
        location,
        setLocation,
        orders,
        setOrders,
        orderLoading,
        searchQuery,
        setSearchQuery,
        searchText,
        setSearchText,
        deliveryCharges,
      }}
    >
      {children}
    </BookContext.Provider>
  );
}
