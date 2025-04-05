import Header from "../common/Header";
import { LayoutProps } from "./module";
import Footer from "../common/Footer";
import { fetchGlobalCoinData } from "../services/api";
import { useQuery } from "@tanstack/react-query";
import BannerComponent from "../components/pagecomponent/BannerComponent";
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const {
    data: topHeaderData,
    isLoading,
    status,
  } = useQuery({
    queryKey: ["globalCoinData"],
    queryFn: fetchGlobalCoinData,
  });

  if (isLoading) {
    return;
  }
  return (
    <>
      <Header topHeaderData={topHeaderData} status={status} />
      <BannerComponent />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
