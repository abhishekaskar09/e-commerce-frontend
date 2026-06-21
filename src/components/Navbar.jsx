import React, { useContext, useState } from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { ProductContext } from '../context/ProductContext';
import { Link, useLocation } from 'react-router';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { search, setSearch, category, setCategory, product } = useContext(ProductContext);
  const { cart } = useContext(CartContext);
  const { dispatch, user } = useContext(AuthContext);


  const location = useLocation()


  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  const categories = ["All", ...new Set(product.map((c) => c.category))];


  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  }

  return (
    (location.pathname === '/' && <nav className='sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md px-6 py-3 border-b border-slate-800 flex justify-between items-center max-w-full shadow-md'>

      {/* 1. LOGO SECTION */}
      <div className='flex items-center'>
        <h2 className='uppercase font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-xl font-sans cursor-pointer'>
          Product Seller
        </h2>
      </div>
      <div className='relative min-w-[160px] font-sans'>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className='w-full appearance-none bg-slate-900 border border-slate-800/90 text-slate-300 text-sm font-semibold px-4 py-2.5 rounded-xl cursor-pointer focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 hover:border-slate-700 transition-all duration-200'
        >
          {categories.map((item, index) => (
            <option
              key={index}
              value={item}
              className='bg-slate-900 text-slate-300 font-medium py-2 uppercase text-xs'
            >
              {item}
            </option>
          ))}
        </select>


        <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500'>
          <svg className='fill-current h-4 w-4 group-hover:text-slate-300 transition-colors' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </div>
      </div>
      {/* 2. SEARCH BAR SECTION */}
      <div className='w-1/3 max-w-md hidden sm:block'>
        <input
          className='w-full px-4 py-2 border border-slate-700/80 text-sm text-slate-200 rounded-xl font-medium bg-slate-950/50 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200'
          type="text"
          value={search}
          placeholder='Search products, categories...'
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 3. RIGHT SIDE: CART & AUTH BUTTONS */}
      <div className='flex items-center gap-4'>

        {/* CART ICON WITH BADGE */}
        <div className='relative p-1 cursor-pointer group transition-transform duration-200 active:scale-95'>
          <Link to='/cart'><FaShoppingCart className='text-2xl text-slate-300 group-hover:text-indigo-400 transition-colors' /></Link>
          {/* ⚡ PERFECT COUNTER BADGE: */}
          <span className='absolute -top-1.5 -right-2.5 bg-rose-600 text-[11px] font-bold text-white h-5 w-5 flex items-center justify-center rounded-full border border-slate-900 shadow-md animate-fade-in'>
            {totalItems}
          </span>
        </div>
        {user ? (

          <>
            <span className="text-xs uppercase font-semibold text-slate-400 bg-slate-850 px-3 py-1.5 rounded-lg border border-slate-800">
              {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-rose-600/10 hover:bg-rose-600 text-rose-400 hover:text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border border-rose-500/20 active:scale-[0.98] transition-all duration-250"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors px-3 py-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl active:scale-[0.98] transition-all duration-200"
            >
              Signup
            </Link>
          </>
        )}



        {/* orderHistory Button */}
        <div>
        <Link to='/orders'><button
            className="border-2 hover:bg-blue-600 text-blue-400 bg-blue-400/20 hover:text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-xl border-blue-600 active:scale-[0.98] transition-all duration-250"
          >
            My Orders
          </button></Link> 
          </div>
      </div>
    </nav>)
  )
}

export default Navbar;