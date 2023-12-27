import React from "react";
import { createBrowserRouter, Route, Navigate } from "react-router-dom";
import SignIn from "../pages/signin/signIn.jsx";
import Signup from "../pages/signup/signUp.jsx";
import About from "../pages/about/about.jsx";
import Contact from "../pages/contact/contact.jsx";
import Courses from "../pages/courses/courses.jsx";
import Admin from "../pages/admin/admin.jsx";
import Ytvideo from "../pages/playlistvideos/ytvideo.jsx";
import Home from "../pages/landingpage/home.jsx";
import { AES } from "crypto-js";
import CryptoJS from "crypto-js";
import ForbiddenPage from "../errorpages/403.jsx";
import NotFoundPage from "../errorpages/404.jsx";



// Protected Route if User is  logged in
const ProtectedRoute = ({ element: Element }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user data from localStorage
    return user ? <Element /> : <Navigate to="/signin" />;
  } catch (error) {
    return <Navigate to="/signin" />;
  }
};


// AuthRoute if login not login then view this route
const AuthRoute = ({ element: Element }) => {
  try {
    const user = JSON.parse(localStorage.getItem("user")); // Parse the user data from localStorage
    return user ? <Navigate to="/courses" /> : <Element />;
  } catch (error) {
    return <Navigate to="/signin" />;
  }
};



// Admin Route if Admin Password == current userpassword encrypt password store in local storage for security
const AdminRoute = ({ element: Element }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    try {
      const pass = AES.decrypt(user.password, "adilhon").toString(
        CryptoJS.enc.Utf8
      );
      return pass == "adil520" ? <Element /> : <Navigate to="/signin" />;
    } catch (error) {
      return <Navigate to="/forbiddenpage" />;
    }
  }
  return <Navigate to="/signin" />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/signin",
    element: <AuthRoute element={SignIn} />,
  },
  {
    path: "/signup",
    element: <AuthRoute element={Signup} />,
  },
  {
    path: "/courses",
    element: <ProtectedRoute element={Courses} />,
  },
  {
    path: "/admin",
    element: <AdminRoute element={Admin} />,
  },
  {
    path: "/playlist/:id",
    element: <ProtectedRoute element={Ytvideo} />,
  },
  {
    path: "/forbiddenpage",
    element: <ForbiddenPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
