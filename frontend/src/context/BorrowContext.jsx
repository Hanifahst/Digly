import { createContext, useContext, useState } from "react";

const BorrowContext = createContext();

export function BorrowProvider({ children }) {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const borrowBook = (book) => {
    const exists = borrowedBooks.find((b) => b.id === book.id);
    if (exists) return;

    setBorrowedBooks([...borrowedBooks, book]);
  };

  const isBorrowed = (id) => {
    return borrowedBooks.some((b) => b.id === id);
  };

  const returnBook = (id) => {
    setBorrowedBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <BorrowContext.Provider
      value={{ borrowedBooks, borrowBook, isBorrowed, returnBook }}
    >
      {children}
    </BorrowContext.Provider>
  );
}

export function useBorrow() {
  return useContext(BorrowContext);
}