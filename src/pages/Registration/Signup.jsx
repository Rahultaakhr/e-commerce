import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import MyContext from "../../context/MyContext";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDb } from "../../firebase/firebaseConfiguration";

function Signup() {

  const { loading, setLoading } = useContext(MyContext)
  const navigate = useNavigate()

  const [userSignup, setUserSignup] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  })

  const userSignupFunction = async () => {
    if (userSignup.name === '' || userSignup.email === '' || userSignup.password === '') {

      toast.error('All field are required')
    }
    setLoading(true)
    try {
      const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password)
      console.log(users);
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uId: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString(
          "en-US",
          {
            month: "short",
            day: "2-digit",
            year: "numeric"
          }
        )
      }
      // UserReffrence 
      const userRefrence = collection(fireDb, "user")

      addDoc(userRefrence, user)

      setUserSignup({
        name: '',
        email: '',
        password: '',
      })

      toast.success("Signup Successfully")
      setLoading(false)
      navigate('/login')

    } catch (error) {
      console.log(error)
     
      setLoading(false)
    }



  }

  return (
    <div className=" w-full h-full">

      <div className=" flex justify-center w-full h-screen items-center ">

        {/* <Loader/> */}
        {loading && <Loader />}
        <div className=" w-full   ">

          <div className=" w-[90%] py-6 px-4 bg-pink-50 border border-pink-600 lg:w-[500px] sm:w-[60%] h-[auto] rounded-xl  mx-auto">

            <h1 className=" pb-5 text-center text-pink-600 text-[25px] font-bold">Signup</h1>
            <Input type='text' className=" mb-5 bg-transparent py-2 px-3 border border-pink-500  outline-pink-600" placeholder='Enter Name'
              value={userSignup.name}
              onChange={(e) => {
                setUserSignup({ ...userSignup, name: e.target.value })
              }} />

            <Input type='email' className=" mb-5 bg-transparent py-2 px-3 border border-pink-500  outline-pink-600" placeholder='Enter Email'
              value={userSignup.email}
              onChange={(e) => {
                setUserSignup({ ...userSignup, email: e.target.value })
              }} />

            <Input type='password' className=" mb-5 bg-transparent py-2 px-3 border border-pink-500  outline-pink-600" placeholder='Enter Password'
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({ ...userSignup, password: e.target.value })
              }}
            />

            <button className=" bg-pink-600 text-white py-3 rounded-xl font-semibold w-full" onClick={userSignupFunction}>Signup</button>

            <h2 className=" pt-2 text-[18px]">Have an account <Link to='/login' className=" font-bold text-pink-600"> Login </Link></h2>

          </div>

        </div>
      </div>

    </div>
  )
}

export default Signup