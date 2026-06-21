 import React, { useContext } from 'react';
import Cartitems from './Cartitems';
 import CartCalculation from './CartCalculation';
import { Link } from 'react-router';
import { CartContext } from '../../context/CartContext';

const Cart = () => {
  const { cart } = useContext(CartContext);

  // ⚡ Empty Cart Premium UI
  if (!cart || cart.length === 0) {
    return (
      <div className="bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <div className="h-20 w-20 bg-slate-900 border border-slate-800 rounded-3xl flex items-center justify-center text-4xl mb-4 shadow-lg shadow-indigo-500/10">
          🛒
        </div>
       <Link to='/'><button className='border-green-400 border-2 rounded p-2 active:scale-95 bg-green-300/20 uppercase font-semibold hover:scale-110 duration-500' >go to Home</button></Link>   
        <h2 className="text-2xl font-black tracking-tight text-slate-100">Your Cart is Empty!</h2>
        <p className="text-slate-500 text-sm mt-1 max-w-xs font-medium">
          Looks like you haven't added anything yet. Go back to the homepage and discover premium gear.
        </p>
      </div>
    );
  }

  return (
     <div className="bg-slate-950 text-slate-100 h-screen md:overflow-hidden p-4 md:p-10 font-sans flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex flex-col h-full">
        
        {/* SHOPPING CART HEADER */}
        <h1 className="text-3xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent flex-shrink-0">
          Shopping Cart ({cart.length})
        </h1>

        {/* ⚡ 2-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start flex-grow min-h-0 overflow-y-auto lg:overflow-hidden pb-6">
          
          {/* ⚡ LEFT SIDE*/}
          <div className="lg:col-span-2 flex flex-col gap-4 h-full lg:overflow-y-auto pr-2 
            [&::-webkit-scrollbar]:w-1.5
            [&::-webkit-scrollbar-track]:bg-slate-950
            [&::-webkit-scrollbar-thumb]:bg-slate-800
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-slate-700">
            {cart.map((item) => (
              <Cartitems key={item.id} cartData={item} />
            ))}
          </div>

          {/* RIGHT SIDE: BILLING CALCULATION */}
          <div className="lg:col-span-1 flex-shrink-0">
            <CartCalculation />
          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;