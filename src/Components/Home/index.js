import { useState, useEffect, useContext } from "react";
import { Circles } from "react-loader-spinner";

import "./index.css";
import PopularMovies from "../PopularMovies";
import Pagination from "../Pagination";
import NotFound from "../NotFound";
import UserContext from "../../Context/UserContext";

// const apiKey = "777bca361cdbe742d18ee00780f6113b";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const Home = () => {
  const { data, setData, apiKey } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
  });

  // const [data, setData] = useState([]);

  useEffect(() => {
    setApiResponse((prevApiResponse) => ({
      ...prevApiResponse,
      status: apiStatusConstants.inProgress,
    }));
    const getData = async () => {
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${currentPage}`;

      const options = {
        method: "GET",
      };

      const response = await fetch(url, options);
      const dataJson = await response.json();
      console.log(dataJson.results);
      const fetchedData = dataJson.results.map((each) => ({
        id: each.id,
        title: each.title,
        posterPath: each.poster_path,
        overview: each.overview,
        backdropPath: each.backdrop_path,
        releaseDate: each.release_date,
        voteAvg: each.vote_average,
      }));

      if (response.ok) {
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
        }));
        setData(fetchedData);
      } else {
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.failure,
        }));
      }
    };

    getData();
  }, [currentPage]);

  const renderSuccessView = () => (
    <div>
      <ul>
        {data.map((each) => (
          <PopularMovies key={each.id} items={each} />
        ))}
      </ul>
    </div>
  );

  const renderLoadingView = () => (
    <div className="loader">
      <Circles
        height="80"
        width="80"
        radius="9"
        color="white"
        ariaLabel="loading"
      />
    </div>
  );

  const renderFailureView = () => <NotFound />;

  const renderLeaderboard = () => {
    const { status } = apiResponse;
    switch (status) {
      case apiStatusConstants.inProgress:
        return renderLoadingView();
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      default:
        return null;
    }
  };

  const goToNextPage = () => {
    if (setData.length !== 0) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="container">
      <div className="buttons-card">
        <Pagination prevPage={goToPrevPage} nextPage={goToNextPage} />
      </div>
      {renderLeaderboard()}
    </div>
  );
};

export default Home;
