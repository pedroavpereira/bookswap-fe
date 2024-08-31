import React from "react";
import SearchForm from "../../components/SearchForm";

function HomePage() {
  return (
    <div className="homepage-background">
      <div className="homepage-headers-container">
        <h1 className="homepage-header">BookNest</h1>
        <h2 className="homepage-subheader">Find books. Swap stories</h2>
      </div>
      <SearchForm />
    </div>
  );
}

export default HomePage;
