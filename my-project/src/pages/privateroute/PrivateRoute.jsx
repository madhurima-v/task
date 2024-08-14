import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("isLoggedIn"));
  console.log("token", token, typeof token);
  return token === true ? children : <Navigate to="/Login" />;
};

export default PrivateRoute;
