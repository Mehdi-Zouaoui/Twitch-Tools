import Sidebar from "./sidebar";
import Header from "./Header";
import { useRouter } from "next/router";
const Layout = ({ children }) => {
  const router = useRouter();

  const showLayout = router.pathname === "/stream/counter" ? false : true;

  return (
    <div>
      {showLayout && (
        <div className="layout">
          <Header />

          <Sidebar />
          {children}
        </div>
      )}
    {!showLayout && (
        <div >
       
          {children}
        </div>
      )}
    </div>
  );
};

export default Layout;
