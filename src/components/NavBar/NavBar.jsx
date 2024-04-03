import SearchBar from "../SearchBar/SearchBar";
import { User } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = () => {
const cartItems=useSelector((state)=>state.cart)
    const navigate = useNavigate()
    const useR = JSON.parse(localStorage.getItem("user"))
    const logoutFunction = () => {
        localStorage.clear('user')
        navigate('/login')
        // console.log(user);

    }
    // navList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5 ">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Product */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Signup */}
            {!useR ? <li>
                <Link to={'/signup'}>Signup</Link>
            </li> : ""}
            {/* Login */}
            {!useR ? <li>
                <Link to={'/login'}>Login</Link>
            </li> : ""}

            {/* User */}
            {useR?.role === "user" && <li>
                <Link to={'/user-dashboard'}>{useR.name}</Link>
            </li>}

            {/* Admin */}
            {useR?.role === "admin" && <li>
                <Link to={'/admin-dashboard'}>{useR?.name}</Link>
            </li>}

            {/* logout */}
            {useR ? <li onClick={logoutFunction}>
                logout
            </li>:""}

            {/* Cart */}
            <li>
                <Link to={useR? "/cart":"/login"}>
                    Cart({cartItems.length})
                </Link>
            </li>
        </ul>
    )
    return (
        <nav className="bg-pink-600 sticky top-0">
            {/* main  */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-3 ">
                {/* left  */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className=" font-bold text-white text-2xl text-center">E-Rahul</h2>
                    </Link>
                </div>

                {/* right  */}
                <div className="right flex justify-center mb-4 lg:mb-0">
                    {navList}
                </div>

                {/* Search Bar  */}
                <SearchBar />
            </div>
        </nav>
    );
}

export default NavBar;