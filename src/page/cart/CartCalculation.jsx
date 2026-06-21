import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
import { useNavigate } from 'react-router';

const CartCalculation = () => {
  const { cart } = useContext(CartContext);

  const [loadingMessage, setLoadingMessage] = useState(false);

  const navigate = useNavigate();

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // ⚡ FIXED: 18% GST Breakdown (multiplied by 0.18 instead of 18)
  const gstTax = totalPrice * 0.18;
  const totalAmount = gstTax + totalPrice;

  const handleLoadingMessage=()=>{
    setLoadingMessage(true);
    setTimeout(() => {
      setLoadingMessage(false);
      navigate('/checkout');
    }, 2000);
  }

  return (
    <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-950/50 flex flex-col gap-5">
      <h2 className="text-lg font-extrabold text-white tracking-wide border-b border-slate-800 pb-3">
        Order Summary
      </h2>

      {/* INVOICE DETAILS BLOCK */}
      <div className="flex flex-col gap-3 text-sm">

        {/* TOTAL QUANTITY */}
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-medium">Total Items (Qty)</span>
          <span className="text-slate-200 font-bold bg-slate-950 border border-slate-800 px-2.5 py-0.5 rounded-lg text-xs">
            {totalItems} items
          </span>
        </div>

        {/* SUBTOTAL */}
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-medium">Subtotal</span>
          <span className="text-slate-200 font-semibold">₹{totalPrice.toFixed(2)}</span>
        </div>

        {/* TAX BREAKDOWN */}
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-medium">GST (18%)</span>
          <span className="text-rose-400 font-semibold">+ ₹{gstTax.toFixed(2)}</span>
        </div>

        {/* SHIPPING RATE */}
        <div className="flex justify-between items-center border-b border-slate-800/60 pb-3">
          <span className="text-slate-400 font-medium">Delivery</span>
          <span className="text-emerald-400 font-bold uppercase text-xs tracking-wider">FREE</span>
        </div>

        {/* GRAND PAYABLE TOTAL */}
        <div className="flex justify-between items-end mt-2 pt-2">
          <div>
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block">Total Payable</span>
            <h1 className="text-3xl font-black text-emerald-400 tracking-tight">
              ₹{totalAmount.toFixed(2)}
            </h1>
          </div>
        </div>

      </div>

      {/* CHECKOUT SUBMIT BUTTON */}
      <button className={`w-full mt-2  ${loadingMessage?'bg-slate-900':'bg-indigo-600 hover:bg-indigo-500'}  text-white font-extrabold text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl active:scale-[0.98] transition-all duration-200 shadow-lg shadow-indigo-600/10`}
        onClick={handleLoadingMessage}>
        {loadingMessage ? (<div className='flex flex-wrap  gap-4 justify-center items-center'>
          <div className='border-l-2 border-t-2 border-white animate-spin h-6 w-6  rounded-full'></div>
          <p>Processing...</p>
        </div>
        )
          : 'Proceed to Checkout' 
        }

      </button>

      {/* FOOTER SECURITY BADGES */}
      <p className="text-[10px] text-slate-500 font-bold tracking-wide uppercase text-center flex items-center justify-center gap-1 mt-1">
        🔒 Secure Checkout • 100% Original Products
      </p>

    </div>
  );
};

export default CartCalculation;