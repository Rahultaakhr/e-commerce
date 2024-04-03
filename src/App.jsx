import AddProduct from "./pages/Admin/AddProduct";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AllProducts from "./pages/AllProducts/AllProducts";
import Cart from "./pages/Cart/Cart";
import CategoryPage from "./pages/Category/CategoryPage";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Registration/Login";
import MyState from "./context/MyState";
import NavBar from "./components/NavBar/NavBar";
import NoPage from "./pages/NoPage/NoPage";
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import ProtectedForAdmin from "./ProtectedRoutes/ProtectedForAdmin";
import ProtectedForUser from "./ProtectedRoutes/ProtectedForUser";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Signup from "./pages/Registration/Signup";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import UserDashboard from "./pages/User/UserDashboard";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

// import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MyState>
        <Router>
          <ScrollTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/*" element={<NoPage />} />
            <Route path="productinfo/:id" element={<ProductInfo />} />
            <Route path="cart" element={<Cart />} />
            <Route path="category/:categoryname" element={<CategoryPage />} />
            <Route path="allproduct" element={<AllProducts />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="user-dashboard" element={
              <ProtectedForUser>
                <UserDashboard />
              </ProtectedForUser>
            } />
            <Route path="admin-dashboard" element={
              <ProtectedForAdmin>
                <AdminDashboard />
              </ProtectedForAdmin>
            } />
            <Route path="add-product" element={
              <ProtectedForAdmin>
                <AddProduct />
              </ProtectedForAdmin>
            } />
            <Route path="update-product/:id" element={
              <ProtectedForAdmin>
                <UpdateProduct />
              </ProtectedForAdmin>
            } />
          </Routes>
          <Toaster />
        </Router>
      </MyState>


    </>
  )
}

export default App
