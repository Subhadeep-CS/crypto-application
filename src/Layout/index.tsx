import Header from "../common/Header";
import { LayoutProps } from "./module";
import Footer from "../common/Footer";
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
