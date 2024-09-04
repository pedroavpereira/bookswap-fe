import React from 'react';

import AnimationBackground from '../../components/AnimationBackground'; // Adjust path if needed
import RecommendationsML from "../../components/RecommendationsML";
import SearchForm from "../../components/SearchForm";

function HomePage() {
  return (
    <div className="homepage-background">
      {/* Add AnimationBackground component */}
      <AnimationBackground />
      
      <div className="homepage-headers-container">
        <h1 className="homepage-header">Book Nest</h1>
        <h2 className="homepage-subheader">Find Books. Swap Stories</h2>
      </div>
      <SearchForm />
      <RecommendationsML />
    </div>
  );
}

export default HomePage;
