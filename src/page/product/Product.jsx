import React, { useContext, useEffect, useState } from 'react'
 import ProductCart from '../product/ProductCart'
import { ProductContext } from '../../context/ProductContext';
 
const Product = () => {
  const { product, search, category } = useContext(ProductContext);
  const [pagination, setPagination] = useState(1);
  console.log(pagination);

  const [limit, setLimit] = useState(8);


  const dataFiltered = product.filter((item) => {
    const searchMatched = item.title.toLowerCase().includes(search.toLowerCase());
    const categoryMacthed = category === "All" || item.category === category.toLowerCase();
    return searchMatched && categoryMacthed;
  });


  // pagination3
  const lastPage = pagination * limit;
  const firstPage = lastPage - limit;
  const currentPage = dataFiltered?.slice(firstPage, lastPage);
  const totalPage = Math.ceil(dataFiltered?.length / limit);

 
  // pagination scrolling from the top
useEffect(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [pagination]);


  return (

    <div className='bg-slate-950 min-h-screen w-full p-6 md:p-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl font-extrabold text-white mb-8 tracking-tight'>
          Featured Products
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {currentPage.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-900/40 border border-slate-800/60 rounded-3xl backdrop-blur-sm max-w-2xl mx-auto my-8 shadow-inner">

              <div className="h-16 w-16 bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-800 text-indigo-400 text-3xl shadow-lg shadow-indigo-500/5 mb-4 animate-bounce">
                🔍
              </div>

              <h2 className="text-xl font-extrabold text-slate-100 tracking-tight">
                No Products Found!
              </h2>


            </div>
          ) : (
            <>
              {currentPage?.map((item) => (
                <ProductCart key={item.id} data={item} />
              ))}
            </>
          )}
        </div>
      </div>

      <div className='flex justify-center items-center gap-6 mt-12 pb-6 font-sans'>

        {/* 1. PREV BUTTON */}
        <button
          className='px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500 hover:text-white active:scale-95 transition-all duration-200 shadow-md shadow-slate-950/50 disabled:opacity-30 disabled:pointer-events-none'
          onClick={() => setPagination((prev) => prev - 1)}
          disabled={pagination === 1}
        >
          Prev
        </button>

        {/* 2. DYNAMIC COUNTER BADGE   */}
        <div className='flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-xl shadow-inner backdrop-blur-sm'>
          <span className='text-base font-black text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-lg border border-indigo-500/20'>
            {pagination}
          </span>
          <span className='text-xs font-bold text-slate-500 uppercase tracking-widest px-1'>
            of
          </span>
          <span className='text-base font-black text-slate-200 bg-slate-950 px-2 py-0.5 rounded-lg border border-slate-800'>
            {totalPage}
          </span>
        </div>

        {/* 3. NEXT BUTTON */}
        <button
          className='px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-300 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500 hover:text-white active:scale-95 transition-all duration-200 shadow-md shadow-slate-950/50 disabled:opacity-30 disabled:pointer-events-none'
          onClick={() => setPagination((next) => next + 1)}
          disabled={pagination === totalPage}
        >
          Next
        </button>

      </div>
    </div>
  )
}

export default Product;