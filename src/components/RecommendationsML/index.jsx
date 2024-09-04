import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useUser } from "../../contexts/UserContext";
import { RECOM_URL } from "../../utils/constants";
import RecommendationCard from "../RecommendationCard";
import BookList from "../BookList";

function RecommendationsML() {
  const { user, isLoading: userLoading } = useUser();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loading = isLoading || userLoading;

  useEffect(
    function () {
      async function fetchRecommendations() {
        try {
          setIsLoading(true);
          if (!user || userLoading) return;

          const response = await fetch(
            `${RECOM_URL}/recommend/${user.user_id}`
          );

          if (response.status !== 200) return null;

          const data = await response.json();

          setRecommendations(data);
        } catch (err) {
          console.log(err);
        } finally {
          setIsLoading(false);
        }
      }

      fetchRecommendations();
    },
    [user, userLoading]
  );

  console.log(recommendations);

  const recommandations = [
    {
      book_id: 1,
      title: "A man for all markets",
      authors: ["Ed. O. Thorp"],
      images: "image2.jpg",
    },
    {
      book_id: 2,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
    {
      book_id: 3,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
    {
      book_id: 4,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
    {
      book_id: 5,
      title: "Money matters",
      authors: ["Jack C K"],
      images: "image2.jpg",
    },
  ];

  if (loading) return null;

  return (
    <div>
      <h1>Books you might enjoy</h1>
      <div>
        <BookList>
          {recommandations?.map((r, i) =>
            i <= 3 ? (
              <RecommendationCard
                key={r.book_id}
                id={r.book_id}
                title={r.title}
                authors={r.authors}
                images={r.images}
              />
            ) : null
          )}
        </BookList>
      </div>
    </div>
  );
}

export default RecommendationsML;
