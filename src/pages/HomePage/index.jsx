import SearchForm from "../../components/SearchForm";
import Recommendations from "../Recommendations";


function HomePage() {
  return (
    <div className="homepage-background">
      <div className="homepage-headers-container">
        <h1 className="homepage-header">Book Nest</h1>
        <h2 className="homepage-subheader">Find Books. Swap Stories</h2>
      </div>
      <SearchForm />
      <Recommendations/>
    </div>
  );
}

export default HomePage;
