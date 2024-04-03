import MyContext from "./MyContext";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { fireDb } from "../firebase/firebaseConfiguration";

function MyState({ children }) {
  const [loading, setLoading] = useState(false)
  const [getAllProduct, setGetAllProduct] = useState([])


  const getAllProductFunction = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDb, "product"),
        orderBy("time")
      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = []
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id })
        })

        setGetAllProduct(productArray)
        setLoading(false)

      })


      return data
    } catch (error) {
      console.log(error);
    }

  }


  const [getAllOrder, setGetAllOrder] = useState([])

  const getAllOrderFunction = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDb, "order"),
        orderBy("time")

      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        let orderArray = [];
        QuerySnapshot.forEach((doc) => {
          orderArray.push({ ...doc.data(), id: doc.id })
        })
        setGetAllOrder(orderArray)
        setLoading(false)

      })

    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  // delete Order Function
  const deleteOrderFunction = async (id) => {
    setLoading(true)
    try {
      await deleteDoc(doc(fireDb, 'order', id))
      toast.success("Order Deleted Succesfully")
      setLoading(false)
      getAllOrderFunction()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }
  const [allUser, setAllUSer] = useState([])
  // Get All User Function 
  const getAllUserFunction = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDb, "user"),
        orderBy("time")
      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        let userArray = [];
        QuerySnapshot.forEach((doc) => {
          userArray.push({ ...doc.data(), id: doc.id })
        })

        setAllUSer(userArray)
        setLoading(false)
      })
    } catch (error) {

      console.log(error);
      setLoading(false)
    }

  }
  useEffect(() => {
    getAllProductFunction()
    getAllOrderFunction()
    getAllUserFunction()
  }, [])


  return (
    <MyContext.Provider value={{ loading, setLoading, getAllProduct, getAllProductFunction, getAllOrder, deleteOrderFunction,allUser }}>
      {children}
    </MyContext.Provider>
  )
}

export default MyState