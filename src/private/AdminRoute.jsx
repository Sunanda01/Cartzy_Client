import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AdminRoute({children}) {
  const { user } = useSelector(
    (state)=>state.auth
  );
  if(!user || !user.role === 'admin'){
    return <Navigate to='/auth/login' replace/>
  }
  return children;
}

export default AdminRoute;
