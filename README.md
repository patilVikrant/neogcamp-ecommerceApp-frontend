# BookCart – Books Ecommerce App

A Fullstack Ecommerce App with functionality such as product listing, filtering, cart management, wishlist management, address management, and order management.
Built with React for frontend, Node/Express for backend, MongoDB for Database and Bootstrap for styling.

---

## Demo Link

[Live Demo](https://book-cart-ecommerce-app-frontend.vercel.app/)

---

## Quick Start

```
git clone https://github.com/patilVikrant/bookCart-ecommerceApp-frontend.git
cd bookCart-ecommerceApp-frontend
npm install
npm run dev
```

---

## Technologies

- React JS
- React Router DOM
- React Context
- Bootstrap
- Node JS
- Express
- MongoDB

---

## Demo Video

Watch a walkthrough of all the major features of this app:
[Loom Video](https://www.loom.com/share/85d1591ee2a748498fdcd023f394e2db)

---

## Features

**Home**

- Displays navigation links to Home, Book Listing, Wishlist, Cart, and User Profile pages.
- Enables users to search books by title.
- Displays top-rated books.

**Product Listing**

- Displays all books in a structured card format with cover image, title, author, rating, and price.
- Applies filters based on price, category, and rating.
- Provides options to view book details, add books to cart, and add books to wishlist.

**Product Detail**

- Displays complete details of a selected book.
- Allows users to add the book to cart, buy instantly, or add to wishlist.

**Wishlist**

- Displays all wishlist items along with their total count.
- Removes items from the wishlist.

**Cart**

- Displays all cart items along with their total count.
- Increases or decreases the quantity of items.
- Removes items from the cart.

**User Profile**

- Displays user details such as Name, email, contact number, and addresses.
- Allows users to add, edit, and delete addresses.

**Order**

- Displays all orders with day and date of placement.

**Order Details**

- Displays complete order information including delivery address, date, time, and product details.

---

## Environment Setup

PORT=5000<br>
MONGODB_URI=your_mongodb_connection_string<br>
JWT_SECRET=your_jwt_secret<br>
CLIENT_URL=http://localhost:3000/

---

## API Reference

### **GET /books**<br>

List all books<br>

Sample Response:<br>

```
[
  {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here..."
  },
  ...
]
```

### **GET /books/:id**<br>

List details of single book<br>

Sample Response:<br>

```
{
  "_id": "...",
  "title": "Book Name",
  "author": "Author Name",
  "price": 299,
  "rating": 4.5,
  "category": "Fiction",
  "publicationHouse": "Publisher Name",
  "image": "https://...",
  "description": "Book description here..."
}
```

### **GET /cart**<br>

List details of books added to the cart<br>

Sample Response:<br>

```
[
  {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "quantity": 2
  },
  ...
]
```

### **POST /cart**<br>

Adds a new item to the cart<br>

Sample Response:<br>

```
{
  "message": "Item added successfully",
  "item": {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "quantity": 1
  }
}
```

### **POST /cart/increase/:id**<br>

Increases the quantity of a cart item<br>

Sample Response:<br>

```
{
  "message": "Item updated successfully",
  "item": {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "quantity": 3
  }
}
```

### **POST /cart/decrease/:id**<br>

Decreases the quantity of a cart item<br>

Sample Response:<br>

```
{
  "message": "Item updated successfully",
  "item": {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "quantity": 1
  }
}
```

### **DELETE /cart/:id**<br>

Removes an item from the cart<br>

Sample Response:<br>

```
{
  "message": "Item deleted successfully",
  "item": {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "quantity": 1
  }
}
```

### **GET /wishlist**<br>

List all the item in the wishlist<br>

Sample Response:<br>

```
[
  {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "isAddedToWishlist": true
  },
  ...
]
```

### **POST /wishlist/:id**<br>

Adds an item to the wishlist<br>

Sample Response:<br>

```
{
  "message": "Item added successfully",
  "item": {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "isAddedToWishlist": true
  }
}
```

### **DELETE /wishlist/:id**<br>

Removes an item from the wishlist<br>

Sample Response:<br>

```
{
  "message": "Item removed successfully",
  "item": {
    "_id": "...",
    "title": "Book Name",
    "author": "Author Name",
    "price": 299,
    "rating": 4.5,
    "category": "Fiction",
    "publicationHouse": "Publisher Name",
    "image": "https://...",
    "description": "Book description here...",
    "isAddedToWishlist": false
  }
}
```

---

## Contact

For bugs and feature requests, please reach out to pvikrant248@gmail.com
