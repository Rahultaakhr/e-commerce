import React from "react";
import { useNavigate } from "react-router-dom";

function Category() {

    const navigate = useNavigate()

    const category = [
        {
            image: 'https://cdn-icons-png.flaticon.com/256/4359/4359963.png',
            name: 'fashion'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/11833/11833323.png',
            name: 'shirt'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/8174/8174424.png',
            name: 'jacket'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/7648/7648246.png',
            name: 'mobile'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/12142/12142416.png',
            name: 'laptop'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/10686/10686553.png',
            name: 'shoes'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/12114/12114279.png',
            name: 'home'
        },
        {
            image: 'https://cdn-icons-png.flaticon.com/256/11946/11946316.png',
            name: 'books'
        }
    ]

    return (

        <div>
            <div className=" flex justify-center">

                <div className="flex overflow-x-scroll lg:justify-center   hide-scroll-bar mt-4">
                    <div className=" flex">
                        {category.map((item, index) => {
                            return (
                                <div key={index} className=" px-3 sm:px-6 md:px-8 lg:px-10">
                                    <div className=" rounded-full bg-pink-600 w-16 h-16 sm:w-20 sm:h-20 max-w-xs lg:w-24 lg:h-24 transition-all hover:bg-pink-400">
                                        <div className=" flex justify-center" onClick={() => navigate(`/category/${item.name}`)}>
                                            <img src={item.image} alt="" />
                                        </div>
                                    </div>


                                    <h1 className=" text-center text-lg first-letter:uppercase ">{item.name}</h1>


                                </div>
                            )
                        })}
                    </div>

                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: ".hide-scroll-bar {  -ms-overflow-style: none;  scrollbar-width: none;}.hide-scroll-bar::-webkit-scrollbar {  display: none;}" }} />

        </div>




    )
}

export default Category