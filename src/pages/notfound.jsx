import { Link } from "react-router-dom";
import "../styles/notfound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>

        <p className="notfound-text">
          Page not found
        </p>

        <Link to="/" className="back-link">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;