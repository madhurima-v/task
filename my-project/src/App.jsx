import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/sign-up/SignUp";
import Login from "./pages/log-in/LogIn";
import Userlisting from "./pages/user-listing/UserListing";
import Dashboard from "./pages/dashboard/Dashboard";
import PrivateRoute from "./pages/privateroute/PrivateRoute";
import Layout from "./pages/layout/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Signup />} />
            <Route path="/Login" element={<Login />} />
          </Route>

          <Route
            path="/Userlisting"
            element={
              <PrivateRoute>
                <Userlisting />
              </PrivateRoute>
            }
          />
          <Route
            path="/Dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
