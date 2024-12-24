import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TrendingCurrenciesListing from "../pages/TrendingCurrenciesListing";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/trending-currencies"
          element={<TrendingCurrenciesListing />}
        ></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
