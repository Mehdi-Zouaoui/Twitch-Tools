import Sidebar from "./sidebar";
import Header from "./Header"

const Layout = ({ children }) => {
  console.log("layout");
  return (
    <div className="layout">
      <Header />
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
