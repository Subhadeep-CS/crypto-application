import Header from "../common/Header";
import { LayoutProps } from "./module";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="container-fluid min-h-screen">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
