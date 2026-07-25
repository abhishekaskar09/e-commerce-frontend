import React, { useContext } from 'react'
import { useParams } from 'react-router';
import { ProductContext } from '../../context/ProductContext';

const ProductDetails = () => {

  const { product,loading } = useContext(ProductContext);

  const {id} = useParams();
  const products = product.find((e) => e.id === Number(id));
  if (!products) return <h2 className='text-white border border-white rounded-sm p-32 text-center font-semibold  uppercase'>No Founds productDetails</h2>
  return (
    <div className="min-h-screen bg-slate-950 text-white py-10 px-5">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl">

        {/* Image */}
        <div className="bg-white rounded-2xl flex justify-center items-center p-8 h-[450px]">
          <img
            src={products?.image || products?.images|| products?.thumbnail}
            alt={products?.title}
            className="w-full h-full object-contain hover:scale-105 transition duration-500"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">

          <div>

            {/* Category */}
            <span className="inline-block bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full text-sm font-semibold uppercase">
              {products?.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-bold mt-4 leading-tight">
              {products?.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="bg-slate-800 px-3 py-1 rounded-lg flex items-center gap-2">
                <span className="text-yellow-400">⭐</span>
                <span className="font-semibold">
                  {products?.rating?.rate || products?.rating || "4.2"}
                </span>
              </div>

              <span className="text-slate-400 text-sm">
                ({products?.rating?.count || 120} Reviews)
              </span>
            </div>

            {/* Price */}
            <h2 className="text-4xl font-bold text-emerald-400 mt-6">
              ₹{products?.price}
            </h2>

            {/* Description */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">
                Product Description
              </h3>

              <p className="text-slate-400 leading-8">
                {products?.description}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default ProductDetails