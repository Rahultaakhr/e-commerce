import Layout from "../../components/Layout/Layout";
import MyContext from "../../context/MyContext";
import React, { useContext } from "react";

const products = [
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: '₹61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: '₹61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
    {
        id: 1,
        name: 'Nike Air Force 1 07 LV8',
        imageSrc:
            'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/54a510de-a406-41b2-8d62-7f8c587c9a7e/air-force-1-07-lv8-shoes-9KwrSk.png',
        href: '#',
        price: '₹61,999',
        color: 'Orange',
        imageAlt: 'Nike Air Force 1 07 LV8',
        quantity: 1,
    },
]


function UserDashboard() {

    const { getAllOrder } = useContext(MyContext)
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <Layout>
            <div>
                <div>
                    <div className=" w-full py-10  ">
                        <div className=" w-[90%] h-[auto]  mx-auto rounded-lg overflow-hidden  border border-pink-400">

                            <div className=" w-full py-5   h-full bg-pink-200 flex flex-col items-center justify-center">
                                <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="" />
                                <h1 className="  text-[18px] font-bold">Name : <span className=" font-normal">{user?.name}</span></h1>
                                <h1 className="  text-[18px] font-bold">Email :<span className=" font-normal">{user?.email}</span></h1>
                                <h1 className="  text-[18px] font-bold">Date : <span className=" font-normal">{user?.date}</span></h1>
                                <h1 className="  text-[18px] font-bold">Role : <span className=" font-normal">{user?.role}</span></h1>
                            </div>

                        </div>

                        <div className=" w-full  rounded-lg">
                            <div className=" rounded-lg w-[90%] md:w-[70%] mx-auto px-2 pt-7 ">
                                <h1 className=" text-[25px] pb-4 font-bold">Order Details</h1>



                                {getAllOrder.filter((obj) => obj.uId === user?.uId).map((order, index) => {

                                    return (


                                        <div key={index}>
                                            {/* Order details start */}
                                            {order.cartItems.map((item, index) => {

                                               return(
                                                <div key={index} className=" border w-full mb-5 border-pink-400 rounded-xl overflow-hidden flex flex-col md:flex-row">
                                                <div className=" w-full md:w-[40%] bg-pink-100 h-[auto] py-5 px-4 ">

                                                    <h1 className=" font-bold pb-2">Order Id <p className=" font-normal ">#{order.id}</p></h1>
                                                    <h1 className=" font-bold pb-2">Date <p className=" font-normal ">{order.date}</p></h1>
                                                    <h1 className=" font-bold pb-2">Total Amount <p className=" font-normal ">₹ {item.quantity* item.price}</p></h1>
                                                    <h1 className=" font-bold pb-2">Order Status <p className=" font-normal text-green-600 ">{order.status}</p></h1>

                                                </div>
                                                <div className=" w-full  flex flex-col gap-5 md:flex-row justify-between  h-full p-5">

                                                    <div className=" flex ">
                                                        <img className=" w-[90px] border rounded-lg  h-[90px]" src={item.productImageUrl} alt="" />
                                                        <div className=" pl-4">
                                                            <h1 className=" text-[16px] font-bold">{item.title}</h1>
                                                            {item.color ? <h2 className=' pt-1 text-[14px] text-gray-400'>{item.color}</h2> : <div> </div>}
                                                            {item.productCategory ? <h2 className=' pt-1 text-[14px] text-gray-400'>{item.productCategory}</h2> : <div> </div>}
                                                            <h2 className=' pt-4 text-[14px] text-gray-400'>x {item.quantity}</h2>
                                                        </div>
                                                    </div>
                                                    <h2 className=" font-bold">{item.price}</h2>

                                                </div>
                                            </div>
                                               )
                                            })}

                                            {/* Order details end */}
                                        </div>
                                    )




                                })}

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UserDashboard