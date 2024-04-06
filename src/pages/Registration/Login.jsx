import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import MyContext from "../../context/MyContext";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDb, firebaseConfig } from "../../firebase/firebaseConfiguration";

function Login() {
  const { loading, setLoading } = useContext(MyContext)

  const navigate = useNavigate()

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: '',
  })

  const userLoginFuction = async () => {

    if (userLogin.email === '' || userLogin.password === '') {
      toast.error("All field required")
    }
    setLoading(true)
    try {
      const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password)

      try {
        const q = query(
          collection(fireDb, "user"),
          where("uId", "==", users?.user?.uid)
        )
        console.log(q);
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => user = doc.data())
          console.log(users);
          localStorage.setItem("user", JSON.stringify(user))

          setUserLogin({
            email: '',
            password: ''
          })
          setLoading(false)
          toast.success('Login Successfully')

          if (user.role === 'user') {
            navigate('/user-dashboard')
          }
          else {
            navigate('/admin-dashboard')
          }

        })
        return data

      } catch (error) {
        console.log(error);
        setLoading(false)
      }



    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }
  useEffect(() => {
    console.log(firebaseConfig,"hello");
   
  }, [])
  
  return (
    <div className=" w-full h-full">

      <div className=" flex justify-center w-full h-screen items-center ">

        {/* Loader */}
        {loading && <Loader />}

        <div className=" w-full   ">

          <div className=" w-[90%] py-6 px-4 bg-pink-50 border border-pink-600 lg:w-[500px] sm:w-[60%] h-[auto] rounded-xl  mx-auto">

            <h1 className=" pb-5 text-center text-pink-600 text-[25px] font-bold">Login</h1>


            <Input type='email' className=" mb-5 bg-transparent py-2 px-3 border border-pink-500  outline-pink-600" placeholder='Enter Email'
              value={userLogin.email}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin, email: e.target.value
                })
              }}
            />

            <Input type='password' className=" mb-5 bg-transparent py-2 px-3 border border-pink-500  outline-pink-600" placeholder='Enter Password'
              value={userLogin.password}
              onChange={(e) => {
                setUserLogin({
                  ...userLogin, password: e.target.value
                })
              }}
            />

            <button className=" bg-pink-600 text-white py-3 rounded-xl font-semibold w-full" onClick={userLoginFuction}>Login</button>
            <h2 className=" pt-2 text-[18px]">Don't Have an account <Link to='/signup' className=" font-bold text-pink-600"> Signup </Link></h2>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Login