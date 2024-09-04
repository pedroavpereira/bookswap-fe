import { useEffect, useState } from "react";
import { useUser } from "../../contexts/UserContext";
import { RECOM_URL } from "../../utils/constants";
import RecommendationCard from "../RecommendationCard";

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

  if (loading) return null;

  return (
    <div>
      <h1>Books you might enjoy</h1>
      <div className="">
        <div className="recommendation-container">
          {recommendations?.map((r, i) =>
            i <= 3 ? (
              <RecommendationCard
                key={r.book_id}
                id={r.book_id}
                isbn={r.isbn}
                title={r.title}
                authors={r.authors}
                image={r?.images || r?.image}
              />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default RecommendationsML;
