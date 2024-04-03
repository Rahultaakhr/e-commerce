import Loader from "../Loader/Loader";
import MyContext from "../../context/MyContext";
import toast from "react-hot-toast";
import { deleteDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fireDb } from "../../firebase/firebaseConfiguration";

const ProductDetails = () => {
    const navigate = useNavigate()
    // const {id} =useParams()

    const { loading,setLoading, getAllProduct,getAllProductFunction } = useContext(MyContext)

// delete Product
const deleteProductFunction= async(id)=>{
    setLoading(true)
    try {
        await deleteDoc(doc(fireDb,"product",id))
        toast.success("Product Delete Successfully")
        // getAllProductFunction()
        setLoading(false)

    } catch (error) {
        console.log(error);
        setLoading(false)
    }

}

    return (
        <div>
            <div className="py-5 flex justify-between items-center">

                {/* text  */}
                <h1 className=" text-xl text-pink-300 font-bold">All Product</h1>
                {/* Add Product Button  */}
                <Link to={'/add-product'}>
                    <button className="px-5 py-2 bg-pink-50 border border-pink-100 rounded-lg">Add Product</button>
                </Link>
            </div>
            <div className=" w-full flex justify-center relative top-20">
                {loading && <Loader />}
            </div>
            {/* table  */}
            <div className="w-full overflow-x-auto mb-5">
                <table className="w-full text-left border border-collapse sm:border-separate border-pink-100 text-pink-400" >
                    <tbody>
                        <tr>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">S.No.</th>
                            <th scope="col" className="h-12 px-6 text-md border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100 font-bold fontPara">Image</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Title</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Price</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Category</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Date</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                            <th scope="col" className="h-12 px-6 text-md font-bold fontPara border-l first:border-l-0 border-pink-100 text-slate-700 bg-slate-100">Action</th>
                        </tr>



                        {/*  */}


                        {getAllProduct.map((product, index) => {




                            return (


                                <tr className="text-pink-300" key={index}>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 ">
                                        {index}.
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        <div className=" flex justify-center">
                                            <img className=" w-32 h-20" src={product.productImageUrl} alt="" />
                                        </div>
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {product.title}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        ₹ {product.price}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {product.productCategory}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500 text-slate-500 first-letter:uppercase ">
                                        {product.date}
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-green-500 cursor-pointer " onClick={() => {
                                        navigate(`/update-product/${product.id}`)
                                    }}>
                                        Edit
                                    </td>
                                    <td className="h-12 px-6 text-md transition duration-300 border-t border-l first:border-l-0 border-pink-100 stroke-slate-500  text-red-500 cursor-pointer "
                                    
                                    onClick={()=>{
                                        deleteProductFunction(product.id)
                                    }}>
                                        Delete
                                    </td>
                                </tr>
                            )

                        })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductDetails;