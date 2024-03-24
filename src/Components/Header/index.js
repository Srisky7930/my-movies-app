import { Outlet, Link } from "react-router-dom";
import "./index.css";

const Header = () => {
  return (
    <div className="header-container">
      <nav className="navbar">
        <div>
          <Link to="/" className="link nav-text">
            Sky Movies
          </Link>
        </div>
        <div>
          <ul className="items-list">
            <li>
              <Link to="/" className="link">
                Popular
              </Link>
            </li>
            <li>
              <Link to="/top" className="link">
                Top Rated
              </Link>
            </li>
            <li>
              <Link to="/upcoming" className="link">
                Upcoming
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Header;
