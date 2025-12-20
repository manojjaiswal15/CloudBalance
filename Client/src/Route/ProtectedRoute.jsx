// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, useLocation } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { user, isAuthenticated } = useSelector(state => state.auth);
  
//   const location = useLocation();
//   if (location.pathname === "/" && isAuthenticated) {
//     return <Navigate to="/dashboard" replace />;
//   }

//   if (!isAuthenticated && location.pathname !== "/") {
//     return <Navigate to="/" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
