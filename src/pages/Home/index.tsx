import BannerComponent from "../../components/pagecomponent/BannerComponent";
import CoinMarketDataComponent from "../../components/pagecomponent/CoinMarketDataComponent";

const Home: React.FC = () => {
  return (
    <>
      <BannerComponent />
      <CoinMarketDataComponent />
    </>
  );
};

export default Home;
