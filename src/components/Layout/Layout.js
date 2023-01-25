import { Outlet } from "react-router-dom";
import NavMenu from "./NavMenu";

const Layout = () => {
  return (
    <div className="app_layout">
      <NavMenu />
      <Outlet />
    </div>
  );
};

export default Layout;
