import confetti from "canvas-confetti";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../context/CartContext";
import { Type } from "lucide-react";

const Payment = () => {

  const { dispatch, cart } = useContext(CartContext);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);


  const navigate = useNavigate();


  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // ⚡ FIXED: 18% GST Breakdown (multiplied by 0.18 instead of 18)
  const gstTax = totalPrice * 0.18;
  const totalTaxwithPrice = gstTax + totalPrice;

  const handlemessages = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false)
      confetti({
        particleCount: 450,
        spread: 90,
        origin: { y: 0.6 }
      });
        
      const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

      const newOrders = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        totalItems: totalItems,
        totalPrice: totalTaxwithPrice,
        items: cart,
      }
      localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrders]));

    }, 2000);

    setComplete(true);
    setTimeout(() => {
      dispatch({
        type: 'CART_CLEAR',
      })
      setComplete(false);
    }, 4000);

    setTimeout(() => {
      navigate('/')
    }, 4500);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4 relative overflow-hidden">

      {/* Background Glows */}
      <div className="absolute w-[300px] h-[300px] bg-indigo-600/10 blur-[120px] rounded-full top-1/4 left-1/4"></div>
      <div className="absolute w-[300px] h-[300px] bg-violet-600/10 blur-[120px] rounded-full bottom-1/4 right-1/4"></div>

      {/* Main Payment Card Box */}
      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-md relative z-10">

        {/* Title & Subtitle */}
        <h2 className="text-3xl font-black mb-2 text-center">
          Checkout Summary
        </h2>
        <p className="text-slate-400 text-sm text-center mb-8">
          Simulate your frontend payment flow securely
        </p>

        {/* Dummy Card / Bill Summary */}
        <div className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 mb-6 space-y-3">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Total Items</span>
            <span className="text-white font-bold">{totalItems} Items</span>
          </div>

          <div className="border-t border-slate-800/60 pt-3 flex justify-between items-center">
            <span className="text-base font-medium">Final Amount</span>
            <span className="text-2xl font-black text-emerald-400">
              {totalTaxwithPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Interactive Payment Demo Button */}
        <button
          className={`
            w-full   py-4   rounded-2xl ${processing ? 'bg-slate-900' : (complete ? "bg-green-700" : "bg-gradient-to-r   from-indigo-600   to-violet-600")}  font-bold   text-lg     hover:scale-[1.02]   active:scale-[0.98]   transition-all   duration-300   shadow-lg   shadow-indigo-600/20`}
          onClick={handlemessages}>

          {processing ?
            (<div className='flex flex-wrap  gap-4 justify-center items-center'>
              <div className='border-l-2 border-t-2 border-white animate-spin h-6 w-6  rounded-full'></div>
              <p>Verfication...</p>
            </div>
            )
            : (complete ? 'PAYMENT SUCCESSFULLY' : ` Pay Rs. ${totalTaxwithPrice.toFixed(2)}`)}
        </button>

        {/* Sandbox Indicator Footer */}
        <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-1">
          <span>🛠️</span> Sandbox / Frontend Demo Mode
        </p>

      </div>
    </div>
  );
};

export default Payment;