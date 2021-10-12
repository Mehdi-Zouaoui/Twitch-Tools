
import Sidebar from "./sidebar";
const Layout = ({ children }) => {
  console.log("layout");
  return (
    <div className="layout">
      <Sidebar />
      {children}
    </div>
  );
};

export default Layout;
