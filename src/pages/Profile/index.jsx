import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext"; // Adjust the import path as needed
import { API_URL } from "../../utils/constants"; // Adjust the import path as needed

const Profile = () => {
  const { user, isLoading: isUserLoading, logout } = useUser();
  const [wishlists, setWishlists] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);

  useEffect(() => {
    async function fetchWishList() {
      try {
        setIsWishlistLoading(true);
        const token = localStorage.getItem("token");
        if (!token) return;

        const options = {
          method: "GET",
          headers: {
            Authorization: token,
          },
        };

        const response = await fetch(`${API_URL}/wishlists/mine`, options);
        if (response.status !== 200) return;

        const data = await response.json();
        setWishlists(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsWishlistLoading(false);
      }
    }

    fetchWishList();
  }, []);

  if (isUserLoading || isWishlistLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  const fullName = `${user.first_name} ${user.last_name}`.trim();

  return (
    <div className="max-w-4xl mx-auto p-4 mt-20">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">{fullName || "User Profile"}</h1>
        <p className="text-sm text-gray-500">Location not set</p>
      </div>

      <div className="flex mb-6">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Profile
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded mr-2">
          Activity
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          onClick={logout}
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">User Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="First Name"
            value={user.first_name || ""}
            readOnly
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Last Name"
            value={user.last_name || ""}
            readOnly
          />
          <input
            type="email"
            className="border p-2 rounded"
            placeholder="Email"
            value={user.email || ""}
            readOnly
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Post Code"
            value={user.lat || ""}
            readOnly
          />
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-2">Wishlist</h2>
        {wishlists.length > 0 ? (
          <ul>
            {wishlists.map((wish) => (
              <li key={wish.wishlist_id} className="mb-2">
                <h3 className="font-bold">{wish.title}</h3>
                <p className="text-sm text-gray-600">Author: {wish.author}</p>
                <p className="text-sm text-gray-600">
                  Condition: {wish.condition}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books in wishlist</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-2">Reviews</h2>
        <p>No reviews yet</p>
      </div>
    </div>
  );
};

export default Profile;
