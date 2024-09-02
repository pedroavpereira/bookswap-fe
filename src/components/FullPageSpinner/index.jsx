import React from "react";

function FullPageSpinner() {
  return (
    <div className="spinner-background" data-testid="spinner-background">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
}

export default FullPageSpinner;
