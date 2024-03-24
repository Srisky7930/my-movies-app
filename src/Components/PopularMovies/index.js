import { Link } from "react-router-dom";
import "./index.css";

const PopularMovies = (props) => {
  const { items } = props;
  const { id, title, posterPath, voteAvg } = items;
  const rating = voteAvg.toFixed(1);

  return (
    <li className="movies-details img-view">
      <Link to={`/details/${id}`} className="link-item">
        <div className="img-details">
          <img
            src={`https://image.tmdb.org/t/p/w500${posterPath}`}
            alt="poster"
          />
        </div>
        <div>
          <h1 className="img-text"> {title} </h1>
          <p className="img-text"> Rating: {rating} </p>
        </div>
      </Link>
    </li>
  );
};

export default PopularMovies;
