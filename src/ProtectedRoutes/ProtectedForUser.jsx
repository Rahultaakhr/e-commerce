import { Navigate } from "react-router-dom";

function ProtectedForUser({children}) {
 const user=JSON.parse(localStorage.getItem("user"))
 if (user?.role==='user') {
    return children
 }
 else{
    return  <Navigate to={"/login"}/>
 }
}

export default ProtectedForUser