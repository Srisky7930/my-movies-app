import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import TopRated from "./Components/TopRated";
import Upcoming from "./Components/Upcoming";
import CastDetails from "./Components/CastDetails";
import UserContext from "./Context/UserContext";
import NotFound from "./Components/NotFound";

const apiKey = "777bca361cdbe742d18ee00780f6113b";

const App = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ data, setData, apiKey }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/top" element={<TopRated />} />
          <Route path="/upcoming" element={<Upcoming />} />
          <Route path="/details/:id" element={<CastDetails palette={id} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
