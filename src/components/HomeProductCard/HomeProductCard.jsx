import Loader from "../Loader/Loader";
import MyContext from "../../context/MyContext";
import React, { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../Redux/CartSlice";

function HomeProductCard() {

    const { getAllProduct, loading, setLoading } = useContext(MyContext)

    const cartItems = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const addCart = (item) => {
        dispatch(addToCart(item))
        toast.success("Added Cart")
    }
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item))
        toast.success("Deleted Cart")
    }
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems))

    }, [cartItems])


    const productData = [
        {
            id: 1,
            image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
            title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 150,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 2,
            image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
            title: 'Kaushalam kalash Copper Pot',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 120,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 3,
            image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
            title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 130,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 4,
            image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
            title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 120,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 1,
            image: 'https://i.pinimg.com/564x/3e/05/ce/3e05cefbc7eec79ac175ea8490a67939.jpg',
            title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 150,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 2,
            image: 'https://i.pinimg.com/736x/e4/61/f2/e461f2246b6ad93e2099d98780626396.jpg',
            title: 'Kaushalam kalash Copper Pot',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 120,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 3,
            image: 'https://i.pinimg.com/564x/fd/50/68/fd50688767adb47aba7204f034554cbd.jpg',
            title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 130,
            trendingProductName: 'Featured',
            quantity: 1,
        },
        {
            id: 4,
            image: 'https://i.pinimg.com/564x/22/80/8d/22808d88ada424962f2e064f3075b2d1.jpg',
            title: 'Hand Painted Blue Kaushalam Tea Pot in Aluminium',
            desc: 'Shop Hand Painted Blue Kaushalam Tea Pot in Aluminium, handmade by Mrinalika Jain. Fair pricing. Ethically made. Positive impact.',
            price: 120,
            trendingProductName: 'Featured',
            quantity: 1,
        }
    ]
    return (
        <div className=" w-full ">


            <div className=" my-5 sm:my-8 text-3xl font-medium">
                <h1 className=" text-center">Best Selling Products</h1>
            </div>
            <div className=" mx-auto flex  overflow-hidden justify-center md:justify-start flex-wrap m-4">

                {loading && <Loader />}
                {getAllProduct.map((product, index) => {

                    return (

                        <div key={index} className=" w-full h-[400px] sm:w-60 sm:h-auto md:w-1/3 md:h-auto border shadow-lg  lg:w-80 lg:h-auto mx-3 my-2 rounded-lg overflow-hidden">
                            <Link to={`/productinfo/${product.id}`}>
                                <img src={product.productImageUrl} className="  w-full h-[62%] md:h-[70%] lg:h-[60%] " alt="" />

                            </Link>
                            <div className=" w-full h-full p-2 sm:p-3">
                                <h2 className=" tracking-widest text-gray-400 mb-1">E-Rahul</h2>
                                <h2 className=" mb-1 text-lg font-semibold text-ellipsis overflow-hidden whitespace-nowrap">{product.title}</h2>
                                <h2 className=" mb-1 text-lg font-semibold">₹{product.price}</h2>
                                {
                                    cartItems.some((p) => p.id === product.id) ?

                                        <button className=" rounded-lg w-full py-2 text-center text-white font-bold bg-pink-600 mx-auto" onClick={() => {
                                            deleteCart(product)
                                        }}>Delete From Cart</button>
                                        :
                                        <button className=" rounded-lg w-full py-2 text-center text-white font-bold bg-pink-600 mx-auto" onClick={() => {
                                            addCart(product)
                                        }}>Add to Cart</button>
                                }
                            </div>
                        </div>

                    )

                })}
            </div>


        </div>
    )
}

export default HomeProductCard