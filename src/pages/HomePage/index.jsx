import React from 'react';
import SearchForm from '../../components/SearchForm';
import AnimationBackground from '../../components/AnimationBackground'; // Adjust path if needed

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
    </div>
  );
}

export default HomePage;
