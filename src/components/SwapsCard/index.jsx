/* eslint-disable react/prop-types */
// import "./WishListCard.css";
import { useUser } from "../../contexts/UserContext";

function SwapsCard({ swap, type = "pending", children }) {
  const { user } = useUser();

  let book;

  if (type === "accepted") {
    book =
      swap.user_offered === user.user_id
        ? swap.bookOffered
        : swap.bookRequested;
  } else if (type === "pending" || type === "rejected") {
    book = swap.bookRequested;
  }

  return (
    <div className="card-container">
      <span href="/" className="hero-image-container">
        <img
          className="hero-image"
          src={book?.image}
          alt="Spinning glass cube"
        />
      </span>
      <main className="main-content">
        <h1>
          <p>{book?.title}</p>
        </h1>
        <div className="flex-row"></div>
      </main>
      <div className="card-attribute">{children}</div>
    </div>
  );
  // return <div></div>;
}

export default SwapsCard;

//
// return (
//   <div className="card-container">
//     <a href="/" className="hero-image-container">
//       <img
//         className="hero-image"
//         src={book.image}
//         alt="Spinning glass cube"
//       />
//     </a>
//     <main className="main-content">
//       <h1>
//         <h2 href="#">{book.title}</h2>
//       </h1>
//       <div className="card-attribute" style={{ marginTop: "0.2rem" }}>
//         <div className="flex-row">
//           <div className="time-left">
//             <HiClock className="small-image" />
//             <p>{wish.radius} miles</p>
//           </div>
//           <div className="time-left">
//             <HiTrash
//               className="small-image text-danger"
//               onClick={() => onDelete(wish.wishlist_id)}
//             />
//           </div>
//         </div>
//       </div>
//     </main>
//   </div>
// );
