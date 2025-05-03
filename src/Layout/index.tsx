import Header from "../common/Header";
import { LayoutProps } from "./module";
import Footer from "../common/Footer";
import { fetchGlobalCoinData } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import BannerComponent from "../components/pagecomponent/BannerComponent";
import { useLocation } from "react-router-dom";
import HeaderSkeleton from "../components/shimmer/HeaderSketeon";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const {
    data: topHeaderData,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["globalCoinData"],
    queryFn: fetchGlobalCoinData,
  });

  return (
    <>
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
        <Header topHeaderData={topHeaderData} status={status} />
      )}
      {["/", "/categories"].includes(location.pathname) && <BannerComponent />}
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
