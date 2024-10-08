import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../FullPageSpinner";
import { useLocalStorageState } from "../../hooks/useLocalStorageState";
import BookSearch from "../BookSearch";

const distancesAllowed = [0.5, 1, 5, 10, 15, 20];

const POST_CODE_API = "https://api.postcodes.io/postcodes";

function SearchForm() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [searchSelected, setSearchSelected] = useState(null);
  const [postCode, setPostCode] = useLocalStorageState("", "postcode");
  const [distance, setDistance] = useState(5);

  async function fetchLocationFromPostCode(postCode) {
    const response = await fetch(`${POST_CODE_API}/${postCode}`);

    const data = await response.json();

    const lat = data.result.latitude;
    const lng = data.result.longitude;

    return { lat, lng };
  }

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      setIsLoading(true);
      if (!titleInput || !postCode) return;

      const title = searchSelected
        ? searchSelected.volumeInfo.title
        : titleInput;

      const formattedTitle = title.replaceAll(" ", "+");
      const { lat, lng } = await fetchLocationFromPostCode(postCode);
      navigate(
        `/search?radius=${distance}&lat=${lat}&lng=${lng}&title=${formattedTitle}`
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  function handleResetSelected() {
    if (searchSelected) {
      setSearchSelected(null);
    }
  }

  return (
    <>
      {isLoading && <FullPageSpinner />}
      <form className="searchform" onSubmit={handleSubmit}>
        <BookSearch
          className="searchform-title-input"
          query={titleInput}
          setQuery={setTitleInput}
          setSelected={setSearchSelected}
          selected={searchSelected}
          onTyping={handleResetSelected}
        >
          <input
            className="w-full searchform-input searchform-title-input"
            type="text"
            value={titleInput}
            placeholder="Book title"
            disabled={isLoading}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </BookSearch>
        <input
          className="searchform-input searchform-postcode-input"
          type="text"
          value={postCode}
          placeholder="Post Code"
          disabled={isLoading}
          onChange={(e) => setPostCode(e.target.value)}
        />
        <select
          className="searchform-input searchForm-distance-input"
          value={distance}
          disabled={isLoading}
          onChange={(e) => setDistance(e.target.value)}
        >
          {distancesAllowed.map((dist) => (
            <option key={dist} value={dist}>
              {dist} miles
            </option>
          ))}
        </select>
        <button
          disabled={isLoading}
          className="searchform-input searchform-submit-button"
        >
          Search
        </button>
      </form>
    </>
  );
}

export default SearchForm;
