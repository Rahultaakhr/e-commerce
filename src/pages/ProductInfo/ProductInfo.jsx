import Layout from "../../components/Layout/Layout";
import Loader from "../../components/Loader/Loader";
import MyContext from "../../context/MyContext";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Timestamp, doc, getDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addToCart, deleteFromCart } from "../../Redux/CartSlice";
import { fireDb } from "../../firebase/firebaseConfiguration";

function ProductInfo() {


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

  
  
  const { getAllProduct, loading, setLoading } = useContext(MyContext)
  const { id } = useParams()
  const [product, setProduct] = useState({
    title: '',
    price: '',
    productImageUrl: '',
    productCategory: '',
    description: '',
    quantity: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US", {
      month: 'short',
      day: "2-digit",
      year: "numeric"
    }
    )

  })

  // get Product
  const getSingleProductFunction = async () => {
    setLoading(true)
    try {
      const productTemp = await getDoc(doc(fireDb, "product", id))
      const product = productTemp.data()


      setProduct({...product,id:productTemp.id})
      setLoading(false)
      return () => product;
    } catch (error) {
      console.log(error);
      setLoading(false)
    }

  }
  useEffect(() => {
    // console.log(getAllProduct);
    getSingleProductFunction()
    localStorage.setItem("cart",JSON.stringify(cartItems))
 
  }, [cartItems])


  // productData 
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
    <Layout>
      <div className=" w-full h-full">


        <div className=" w-full sm:py-20 max-w-6xl mx-auto py-4 px-5 md:px-0 lg:px-0 ">
          <div className="  flex flex-col  sm:flex-row justify-between items-start ">

            <div className=" absolute justify-center left-[50%]  top-[50%] items-center flex">
              {loading && <Loader />}
            </div>
            <div className=" w-full sm:w-[45%] h-[400px] sm:h-full  md:h-[550px]  ">

              <img className=" w-full h-full rounded-sm" src={product.productImageUrl} alt="" />
            </div>
            <div className=" w-full sm:w-[45%] h-[auto] sm:h-full">
              <h1 className=" text-[25px] font-semibold my-1 pb-3">{product.title}</h1>

              <div className=" pb-3">
                <ul className="flex mb-4 mr-2 lg:mb-0">
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-red-500  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-red-500  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-red-500 bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={16}
                        height={16}
                        fill="currentColor"
                        className="w-4 mr-1 text-red-500  bi bi-star "
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>

              <h1 className=" font-bold text-[22px] pb-3">₹ {product.price}</h1>

              <h2 className=" font-semibold text-[18px]">Description :</h2>
              <p className=" text-wrap pb-3"> {product.description}</p>

              <div className=" w-full text-center">
                {cartItems.some((p) => p.id === product.id) ?
                  <button className=" border-pink-600 border text-white w-full py-3 rounded-xl sm:my-3 bg-pink-600 hover:bg-pink-600 hover:text-white  font-semibold" onClick={()=>{
                    deleteCart(product)
                  }}>Delete From Cart</button>
                  :
                  <button className=" border-pink-600 border text-white w-full py-3 rounded-xl sm:my-3 bg-pink-400 hover:bg-pink-600 hover:text-white  font-semibold" onClick={()=>{
                    addCart(product)
                  }}>Add to Cart</button>

                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductInfo