import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ redirectPath = "/login", children }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate replace to={redirectPath} />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
