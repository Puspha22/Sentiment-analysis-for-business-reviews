import { Routes, Route, Navigate } from "react-router-dom";
import App from "../App";
import Login from "../components/authentication/login/Login";
import OTP from "../components/authentication/OTP/OTP";
import Signup from "../components/authentication/signup/Signup";
import Dashboard from "../views/dashboard/Dashboard";
import Forget from "../components/authentication/forgetPassword/Forget";
import ResetPassword from "../components/authentication/resetPassword/ResetPassword";
import LandingPage from "../views/Home/LandingPage";

const Routing = () => {
  const isAuth = localStorage.getItem("userToken");

  return (
    <App path="/">
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Navigate to="/home" /> : <LandingPage />}
        />
        <Route
          path="/signup"
          element={isAuth ? <Navigate to="/home" /> : <Signup />}
        />
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/home" /> : <Login />}
        />
        <Route
          path="/home"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route path="/otp/:email" element={<OTP />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/reset-password/:email/:otp" element={<ResetPassword />} />
      </Routes>
    </App>
  );
};

export default Routing;
