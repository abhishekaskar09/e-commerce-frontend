 import React, { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';

const ProductCart = ({ data }) => {
  const { dispatch } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addTocart = (product) => {
    if (!user) {
      return navigate('/signup')
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: product
    });
  }

  const laodingFunction = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  return (
    <div className='group relative bg-slate-900 border border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between shadow-lg hover:shadow-indigo-500/5 hover:border-slate-700/80 transition-all duration-300 transform hover:-translate-y-1 h-[430px]'>

      {/* 1. Image Container (FIXED: Rendered size 0x0px collapse issue resolved) */}
      <div className='w-full h-44 bg-white p-4 flex justify-center items-center rounded-xl overflow-hidden shadow-inner block'>
        <img
          className='group-hover:scale-105 duration-500 object-contain w-full h-full max-h-40 transition-transform block'
          src={data?.image || data?.images?.[0] || data?.thumbnail}
          alt={data?.title || "Product Image"}
          loading="lazy"
        />
      </div>

      {/* 2. Content Container */}
      <div className='flex flex-col flex-grow mt-4 justify-start'>
        <span className='text-xs text-indigo-400 font-bold uppercase tracking-wider mb-1 block'>
          {data?.category || "General"}
        </span>

        {/* Title */}
        <h2 className='font-bold text-lg text-slate-100 line-clamp-1 group-hover:text-indigo-400 transition-colors duration-200'>
          {data?.title}
        </h2>

        {/* Description */}
        <p className='text-sm text-slate-400 font-medium line-clamp-2 mt-1 leading-relaxed'>
          {data?.description}
        </p>
      </div>

      {/* 3. Price, Rating and Button */}
      <div className='mt-4 pt-3 border-t border-slate-800/60'>
        <div className='flex justify-between items-center mb-3'>
          <div>
            <span className='text-xs text-slate-500 block font-medium'>Price</span>
            <h3 className='text-xl font-extrabold text-emerald-400 font-sans'>
              ₹{data?.price}
            </h3>
          </div>
          
          {/* Rating */}
          <div className='flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800'>
            <span className='text-yellow-400 text-xs'>⭐</span>
            <span className='font-bold text-xs text-slate-200'>
              {data?.rating?.rate || data?.rating || "4.2"}
            </span>
          </div>
        </div>

        {/* Button */}
        <button 
          className={`w-full ${loading ? "bg-green-500/50 duration-300" : "bg-indigo-600 hover:bg-indigo-500"} text-white font-semibold py-2.5 px-4 rounded-xl active:scale-[0.98] transition-all duration-200 text-sm shadow-md shadow-indigo-600/10`}
          onClick={() => {
            addTocart(data);
            laodingFunction();
          }}
        >
          {loading ? <span className='text-xl font-semibold '>👍Added</span> : <span>Add to Cart</span>}
        </button>
      </div>

    </div>
  )
}

export default ProductCart;