/* eslint-disable react/prop-types */
import BookCard from "../BookCard";

const mockRequest = [
  {
    collection_id: 4,
    book_id: 3,
    user_id: 1,
    user: {
      first_name: "Pedro",
      last_name: "Pereira",
    },
    condition: "mint",
    delivery_preference: ["hand-off"],
    book: {
      book_id: 3,
      title: "Crime and Punishment",
      authors: ["Fyodor Dostoyevsky"],
      categories: ["Fiction"],
      lang: "en",
      isbn: "9780140449136",
      image:
        "http://books.google.com/books/content?id=SYu-4-oO3h8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
  },
  {
    collection_id: 3,
    book_id: 3,
    user_id: 1,
    user: {
      first_name: "Pedro",
      last_name: "Pereira",
    },
    condition: "mint",
    delivery_preference: ["hand-off"],
    book: {
      book_id: 3,
      title: "Crime and Punishment",
      authors: ["Fyodor Dostoyevsky"],
      categories: ["Fiction"],
      lang: "en",
      isbn: "9780140449136",
      image:
        "http://books.google.com/books/content?id=SYu-4-oO3h8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    },
  },
];

function BookList({ collections }) {
  return (
    <div className="bookList-container">
      {collections.map((col) => (
        <BookCard collection={col} key={col.collection_id} />
      ))}
    </div>
  );
}

export default BookList;
