import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("isLoggedIn");
  return token ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
