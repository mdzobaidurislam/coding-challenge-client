import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";

const RequireAdmin = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(email);
  const { admin } = useAdmin(token);
  const location = useLocation();

  if (!admin) {
    return (
      <div className="loader">
        <h1>.</h1>
      </div>
    );
  }
  if (!admin) {
    return <Navigate to="/login" sate={{ form: location }} replace />;
  }
  return children;
};

export default RequireAdmin;
