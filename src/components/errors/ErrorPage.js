import React from 'react';
import { Link } from 'react-router-dom';

function ErrorPage({ message }) {
  return (
    <div className="error-page">
      <h2>Oops! Something went wrong.</h2>
      <p>{message || "An unexpected error has occurred."}</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
}

export default ErrorPage;
