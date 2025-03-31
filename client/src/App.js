import { Route, Routes, useNavigate } from "react-router-dom";

import './App.css';
import { Navbar } from './components/common/Navbar';
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { ContactUs } from "./pages/ContactUs";
import { Error } from "./pages/Error";
import { Premium } from "./pages/Premium";
import OpenRoute from "./components/core/Auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import PrivateRoute from "./components/core/Auth/PrivateRoute"
import Dashboard from "./pages/Dashboard";
import { MyProfile } from "./components/core/Dashboard/MyProfile";
import { PremiumDetails } from "./components/core/Dashboard/PremiumDetails";
import { Logout } from "./components/core/Dashboard/Logout";
import { Settings } from "./components/core/Dashboard/Settings";
import { MainDashboard } from "./components/core/Dashboard/MainDashboard/MainDashboard";
import { AddJokeMeme } from "./components/core/Dashboard/AddJokeMeme/AddJokeMeme";



function App() {

  const navigate = useNavigate();

  return (
    <div className="">
      <div className='flex flex-col'>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />


          <Route
            path="/signup"
            element={
              <OpenRoute>
                <Signup />
              </OpenRoute>
            }
          />
          <Route
            path="/login"
            element={
              <OpenRoute>
                <Login />
              </OpenRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <OpenRoute>
                <ForgotPassword />
              </OpenRoute>
            }
          />

          <Route
            path="/verify-email"
            element={
              <OpenRoute>
                <VerifyEmail />
              </OpenRoute>
            }
          // element={
          //   <VerifyEmail />
          // }
          />

          <Route
            path="/update-password/"
            element={
              <OpenRoute>
                <UpdatePassword />
              </OpenRoute>
            }
          />

          <Route
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >

            <Route
              path="/dashboard/main-dashboard"
              element={
                <MainDashboard />
              }
            />

            <Route
              path="/dashboard/my-profile"
              element={
                <MyProfile />
              }
            />

            <Route
              path="/dashboard/add-joke-meme"
              element={
                <AddJokeMeme />
              }
            />

            <Route
              path="/dashboard/premium-details"
              element={
                <PremiumDetails />
              }
            />

            <Route
              path="/dashboard/settings"
              element={
                <Settings />
              }
            />

            <Route
              path="/dashboard/logout"
              element={
                <Logout />
              }
            />

          </Route>














          <Route path="/premium" element={<Premium />} />







          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
