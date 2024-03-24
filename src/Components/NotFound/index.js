import { Link } from "react-router-dom";
import "./index.css";

const NotFound = () => (
  <div className="not-found-card">
    <h1 className="not"> Notfound </h1>
    <button type="button">
      <Link to="/" className="not-found-btn">
        Home
      </Link>
    </button>
  </div>
);

export default NotFound;
