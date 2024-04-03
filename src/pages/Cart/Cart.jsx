import BuyNowModal from "../../components/BuyNowModal/BuyNowModal";
import Layout from "../../components/Layout/Layout";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Timestamp, addDoc, collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { Trash } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { decreamentQuantity, deleteFromCart, increamentQuantity } from "../../Redux/CartSlice";
import { fireDb } from "../../firebase/firebaseConfiguration";

function Cart() {
    const cartItems = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    let user = JSON.parse(localStorage.getItem("user"))

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item))
        toast.success("Delete Cart")
    }
    const handleIncreament = (item) => {
        dispatch(increamentQuantity(item))
    }
    const handleDecreament = (item) => {
        dispatch(decreamentQuantity(item))
    }
    const cartItemsTotal = cartItems.map((item) => item.quantity).reduce((prevValue, currValue) => prevValue + currValue, 0)
    const cartItemsTotalCost = cartItems.map((item) => item.quantity * item.price).reduce((prevValue, currValue) => prevValue + currValue, 0)

    const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric"
            }
        )
    })


    const buyNowFunction = () => {
        if (addressInfo.name === "" || addressInfo.pincode === "" || addressInfo.address === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Field Required")

        }
        const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            uId: user.uId,
            status: "confirmed",
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
        try {
            const orderRef = collection(fireDb, "order")
            addDoc(orderRef, orderInfo)
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",

            })
            toast.success("Ordered Successfully")
        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))
      
    }, [cartItems, cartItemsTotal])


    return (


        <Layout>
            <div className=" w-full md:px-5">
                <div className=" container mx-auto px-4 md:px-0 max-w-7xl ">
                    <div className=" w-full max-w-7xl mx-auto h-auto  py-8">
                        <h1 className=" text-[30px]   font-bold mb-10">   Shopping Cart</h1>
                        <div className=" flex flex-col md:flex-row sm:justify-between">

                            <div className=" flex flex-col w-[100%] md:w-[65%]  h-auto">
                                {
                                    cartItems.length === 0 ? <h1 className=" text-[20px] font-bold">Cart Empty</h1> :
                                        cartItems.map((product, index) => {
                                            return (
                                                <div key={index} className=" w-[100%] h-[150px]   border-b mb-5">
                                                    <div className=" w-full h-24 md:h-24   ">

                                                        <div className=" w-full h-full flex">
                                                            <img className=" w-[120px] h-[90px] rounded-lg" src={product.productImageUrl} alt="" />
                                                            <div className=" px-4   w-full">
                                                                <h1 className=" text-[16px] font-semibold">{product.name}</h1>

                                                                <div className=" flex items-center  text-[14px]  ">
                                                                    <h2 className=" border-r  text-gray-400 font-normal pr-3">{product.color}</h2>
                                                                    <h2 className="  text-gray-400 font-normal pl-3">{product.size}</h2>
                                                                </div>

                                                                <div className=" text-[14px] font-semibold ">
                                                                    <h2> ₹ {product.price}</h2>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="  flex items-center gap-3">
                                                            <div className=" flex">
                                                                <button className=" text-[18px] px-3" onClick={() => {
                                                                    handleDecreament(product)
                                                                }}>-</button>
                                                                <input className=" w-[30px] border rounded-md px-[4px]" type="text" value={product.quantity} onChange={(e) => {
                                                                    console.log(e.target.value);
                                                                }} name="" id="" />
                                                                <button className=" text-[18px] px-3" onClick={() => {
                                                                    handleIncreament(product)
                                                                }}>+</button>
                                                            </div>


                                                            <div className=" flex items-center gap-2" onClick={() => {
                                                                deleteCart(product)
                                                            }}>
                                                                <Trash size={12} className="text-red-500" />
                                                                <h2 className=" text-red-500">Remove</h2>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                            <div className=" w-[100%] md:w-[30%] sm:mr-5  h-[300px] ">

                                {/* Price */}
                                <div className=" px-4">
                                    <h1 className=" mb-5 w-full border-b text-[18px] font-semibold px-1 ">Price Details</h1>
                                    <div className=" flex justify-between w-full text-[14px] mb-5">
                                        <span className="font-medium text-gray-700 ">Price ({cartItemsTotal} items)</span>
                                        <span className="  font-semibold">₹ {cartItemsTotalCost}</span>
                                    </div>

                                    {/* Discount */}
                                    <div className=" flex justify-between w-full text-[14px] mb-5">
                                        <span className=" font-medium text-gray-700 ">Discount</span>
                                        <span className="  font-semibold text-green-500">- ₹ 3,499</span>
                                    </div>
                                    {/* Delivery */}
                                    <div className=" flex justify-between w-full text-[14px] mb-3 pb-3 border-b border-gray-100">
                                        <span className=" font-medium text-gray-700 ">Delivery Charges</span>
                                        <span className="  font-semibold text-green-500">Free</span>
                                    </div>
                                    {/* Total Amount */}
                                    <div className=" flex justify-between border-b mb-5 pb-2 border-gray-100">
                                        <span className=" text-[16px] font-semibold">Total Amount</span>
                                        <span className=" text-[16px] font-semibold">₹{cartItemsTotalCost - 3499}</span>
                                    </div>

                                    <div className=" w-full">
                                        {
                                            user ?

                                                <BuyNowModal setAddressInfo={setAddressInfo} addressInfo={addressInfo} buyNowFunction={buyNowFunction} />

                                                : <Navigate to={"/login"} />
                                        }
                                    </div>

                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Cart