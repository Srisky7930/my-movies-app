import { Circles } from "react-loader-spinner";

import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../Context/UserContext";
import Overview from "../Overview";

import "./index.css";
import NotFound from "../NotFound";

//

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const CastDetails = () => {
  const { data, apiKey } = useContext(UserContext);
  const [details, setDetails] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [apiResponse, setApiResponse] = useState({
    status: apiStatusConstants.initial,
  });
  const { id } = useParams();

  useEffect(() => {
    setApiResponse((prevApiResponse) => ({
      ...prevApiResponse,
      status: apiStatusConstants.inProgress,
    }));
    const getData = async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
      const options = {
        method: "GET",
      };

      const response = await fetch(apiUrl, options);
      const dataJson = await response.json();
      const fetchedData = dataJson.cast.map((each) => ({
        profile: each.profile_path,
        character: each.character,
        name: each.name,
      }));

      if (response.ok) {
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.success,
        }));
        setDataList(fetchedData);
      } else {
        setApiResponse((prevApiResponse) => ({
          ...prevApiResponse,
          status: apiStatusConstants.failure,
        }));
      }
    };

    getData();

    const matchId = parseInt(id);
    const result = data.filter((each) => each.id === matchId);
    setDetails(result);
  }, []);

  const renderSuccessView = () => (
    <>
      <div className="crew">
        <h1 className="text"> Cast </h1>
        <ul>
          {dataList.map((eachItem) => (
            <li key={eachItem.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${eachItem.profile}`}
                alt="poster"
                className="profile-image"
              />
              <h1 className="name"> {eachItem.name} </h1>
              <p className="character"> character: {eachItem.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );

  const renderLoadingView = () => (
    <div className="loader">
      <Circles
        height="40"
        width="40"
        radius="9"
        color="white"
        ariaLabel="loading"
      />
    </div>
  );

  const renderFailureView = () => {
    <NotFound />;
  };

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

  return (
    <div className="cast-container">
      <div className="overview-card">
        <ul>
          {details.map((each) => (
            <Overview key={each.id} itemDetails={each} />
          ))}
        </ul>
      </div>
      <div>{renderLeaderboard()}</div>
    </div>
  );
};

export default CastDetails;
