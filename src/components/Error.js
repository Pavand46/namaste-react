const Error = () => {
  return (
    <div className="error-container">
      <h1 className="error-code">Oops!</h1>
      <h2 className="error-message">Something went wrong.</h2>
      <p className="error-description">
        The page you are looking for might be missing or temporarily
        unavailable.
      </p>
      <a href="/" className="home-link">
        ← Go back to Home
      </a>
    </div>
  );
};

export default Error;
