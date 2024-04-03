import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedForAdmin({children}) {
  const user =JSON.parse(localStorage.getItem("user"))
  if (user?.role==="admin") {
    return children
  }
  else {
 return <Navigate to={'/login'}/>
}
}

export default ProtectedForAdmin