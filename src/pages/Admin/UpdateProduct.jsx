import Loader from "../../components/Loader/Loader";
import MyContext from "../../context/MyContext";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { fireDb } from "../../firebase/firebaseConfiguration";

const categoryList = [
    {
        name: 'fashion'
    },
    {
        name: 'shirt'
    },
    {
        name: 'jacket'
    },
    {
        name: 'mobile'
    },
    {
        name: 'laptop'
    },
    {
        name: 'shoes'
    },
    {
        name: 'home'
    },
    {
        name: 'books'
    }
]

const UpdateProductPage = () => {
    const { loading, setLoading, getAllProductFunction } = useContext(MyContext)
    const { id } = useParams()
    const navigate = useNavigate()
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

    // get Single Product functiion
    const getSingleProductFunction = async () => {
        setLoading(true)
        try {
            const productTemp = await getDoc(doc(fireDb, "product", id))
            const product = productTemp.data()

            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                productCategory: product?.productCategory,
                description: product?.description,
                quantity: product?.quantity,
                time: product?.time,
                date: product?.date

            })
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
        }

    }

    // update product function
    const updateProduct = async () => {
        setLoading(true)

        try {
            await setDoc(doc(fireDb, "product", id), product)
            toast.success("Product updated Successfully")
            console.log(product);
            setLoading(false)
            // getAllProductFunction()
            navigate('/admin-dashboard')
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    useEffect(() => {
        getSingleProductFunction()
    }, [])

    return (
        <div>
            <div className='flex justify-center items-center h-screen'>

                {loading && <Loader />}
                {/* Login Form  */}
                <div className="login_Form bg-pink-200 px-8 py-6 border w-[90%] md:w-[50%] border-pink-400 rounded-xl shadow-md">

                    {/* Top Heading  */}
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-pink-600 '>
                            Update Product
                        </h2>
                    </div>

                    {/* Input One  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="title"
                            placeholder='Product Title'
                            className='bg-pink-50 w-full border text-pink-500 border-pink-400 px-2 py-2 rounded-md outline-none placeholder-pink-500'
                            value={product.title}
                            onChange={(e) => {
                                setProduct({
                                    ...product, title: e.target.value
                                })
                            }}

                        />
                    </div>

                    {/* Input Two  */}
                    <div className="mb-3">
                        <input
                            type="number"
                            name="price"
                            placeholder='Product Price'
                            className='bg-pink-50 w-full border text-pink-500 border-pink-400 px-2 py-2 rounded-md outline-none placeholder-pink-500'

                            value={product.price}
                            onChange={(e) => {
                                setProduct({
                                    ...product, price: e.target.value
                                })
                            }}
                        />
                    </div>

                    {/* Input Three  */}
                    <div className="mb-3">
                        <input
                            type="text"
                            name="productImageUrl"
                            placeholder='Product Image Url'
                            className='bg-pink-50 w-full border text-pink-500 border-pink-400 px-2 py-2 rounded-md outline-none placeholder-pink-500'

                            value={product.productImageUrl}
                            onChange={(e) => {
                                setProduct({
                                    ...product, productImageUrl: e.target.value
                                })
                            }}
                        />
                    </div>

                    {/* Input Four  */}
                    <div className="mb-3">
                        <select
                            className='bg-pink-50 w-full border text-pink-500 border-pink-400 px-2 py-2 rounded-md outline-none placeholder-pink-500'
                            value={product.productCategory}
                            onChange={(e) => {
                                setProduct({
                                    ...product, productCategory: e.target.value
                                })
                            }}
                        >
                            <option disabled>Select Product Category</option>
                            {categoryList.map((value, index) => {
                                const { name } = value
                                return (
                                    <option className=" first-letter:uppercase" key={index} value={name}>{name}</option>
                                )
                            })}
                        </select>
                    </div>

                    {/* Input Five  */}
                    <div className="mb-3">
                        <textarea
                            name="description" placeholder="Product Description" rows="5" className='bg-pink-50 w-full border text-pink-500 border-pink-400 px-2 py-2 rounded-md outline-none placeholder-pink-500'

                            value={product.description}
                            onChange={(e) => {
                                setProduct({
                                    ...product, description: e.target.value
                                })
                            }}
                        >
                        </textarea>
                    </div>

                    {/* Update Product Button  */}
                    <div className="mb-3">
                        <button
                            type='button'
                            className='bg-pink-500 hover:bg-pink-600 w-full text-white text-center py-2 font-bold rounded-md '
                            onClick={updateProduct}
                        >
                            Update Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProductPage;