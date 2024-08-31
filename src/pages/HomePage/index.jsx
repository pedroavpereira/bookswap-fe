import SearchForm from "../../components/SearchForm";


function HomePage() {
  return (
    <div className="homepage-background">
      <div className="homepage-headers-container">
        <h1 className="homepage-header">Book Nest</h1>
        <h2 className="homepage-subheader">Find Books. Swap Stories</h2>
      </div>
      <SearchForm />
    </div>
  );
}

export default HomePage;
