import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import TrendingCurrenciesListing from "../pages/TrendingCurrenciesListing";
import CoinDetails from "../pages/CoinDetails";
const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="/trending-currencies"
          element={<TrendingCurrenciesListing />}
        ></Route>
        <Route path="/coin-details/:coin_id" element={<CoinDetails />}></Route>
      </Routes>
    </>
  );
};

export default AppRouter;
