import MyContext, {  } from "../../context/MyContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fireDb } from "../../firebase/firebaseConfiguration";

const category = [
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



function AddProduct() {
  const navigate = useNavigate()
  const { loading, setLoading } = useContext(MyContext)


  const [product, setProduct] = useState({
    title: "",
    price: "",
    productImageUrl: "",
    productCategory: "",
    description: '',
    quantity: 1,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  });


  const addProductFunction = async () => {
    if (product.title === '' || product.price === '' || product.productImageUrl === '' || product.productCategory === '' || product.desc === '' || product.productCategory === '') {

      toast.error("All fields required")

    }
    setLoading(true)
    try {
      const productRef = collection(fireDb, "product")
      await addDoc(productRef, product)
      setLoading(false)
      toast.success("Product added Successfully")
      navigate("/admin-dashboard")


    } catch (error) {
      console.log(error);
      toast.error("Add product failed")
      setLoading(false)
    }


  }

  return (
    <div>

      <div className=" w-full h-screen flex justify-center items-center ">
        <div className=" w-[95%] md:w-[60%] lg:w-[550px] rounded-xl h-[auto] border border-black bg-pink-200 ">
          <h1 className="  text-center text-[20px] font-bold text-pink-600 ">Add Product</h1>
          <div className=" w-full px-5  bg-transparent py-3 ">
            {/* Input 1 */}
            <div className=" bg-transparent ">
              <input className=" bg-transparent mb-4 w-full border text-pink-600 placeholder:text-pink-600 border-pink-600 py-1 rounded-lg px-3 outline-none" type="text" placeholder="Product Title"
                value={product.title}
                onChange={(e) => {
                  setProduct({ ...product, title: e.target.value })
                }}
              />
            </div>
            {/* Input 2 */}
            <div>
              <input className=" bg-transparent mb-4 w-full border text-pink-600 placeholder:text-pink-600 border-pink-600 py-1 rounded-lg px-3 outline-none" type="number" placeholder="Product Price"
                value={product.price}
                onChange={(e) => {
                  setProduct({ ...product, price: e.target.value })
                }}
              />
            </div>
            {/* Input 3 */}
            <div>
              <input className=" bg-transparent mb-4 w-full border text-pink-600 placeholder:text-pink-600 border-pink-600 py-1 rounded-lg px-3 outline-none" type="text" placeholder="Product Image Url"
                value={product.productImageUrl}
                onChange={(e) => {
                  setProduct({ ...product, productImageUrl: e.target.value })
                }}
              />
            </div>
            {/* Input 4 */}
            <div>

              <select className="w-full px-1 py-2 text-pink-600 bg-pink-200 mb-3 border border-pink-600 rounded-md outline-none  "

                value={product.productCategory}
                onChange={(e) => {
                  setProduct({ ...product, productCategory: e.target.value })
                }}
              >

                <option value="" disabled>Select Product Category</option>

                {category.map((value, index) => {
                  return (
                    <option className=" first-letter:uppercase" value={value.name} key={index}>{value.name}</option>
                  )

                })}
              </select>
            </div>
            {/* Input 5 */}
            <div>
              <textarea className=" bg-transparent mb-4 w-full border text-pink-600 placeholder:text-pink-600 border-pink-600 py-1 rounded-lg px-3 outline-none" name="" id="" placeholder="Product Description" cols="30" rows="5"

                value={product.description}
                onChange={(e) => {
                  setProduct({ ...product, description: e.target.value })
                }}
              ></textarea>
            </div>


            <button className=" w-full py-2 bg-pink-600 rounded-xl text-white" onClick={addProductFunction}>Add Product</button>
          </div>


        </div>
      </div>
    </div>
  )
}

export default AddProduct