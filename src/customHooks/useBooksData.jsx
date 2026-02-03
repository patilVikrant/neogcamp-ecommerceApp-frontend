import { useEffect, useState } from "react";

const useBooksData = (url) => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(url);
        const responseData = await response.json();
        setBooks(responseData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, [url]);
  return books;
};

export default useBooksData;
