 import React, { useContext, useState } from 'react';
import { CartContext } from '../../context/CartContext';
 
const Cartitems = ({ cartData }) => {
  const { quantityIncreased, quantityDecreased, removedItem } = useContext(CartContext);
  const [confirm, setConfirm] = useState(false);

  return (
    <div className="bg-slate-900/60 border border-slate-800/80 p-4 rounded-2xl grid grid-cols-1 sm:grid-cols-12 items-center gap-4 backdrop-blur-sm shadow-md hover:border-slate-700/80 transition-all duration-300">
      
      {/* COLUMN 1 to 5: IMAGE & PRODUCT DETAILS */}
      <div className="flex items-center gap-4 col-span-1 sm:col-span-5 w-full">
        {/* IMAGE CONTAINER */}
        <div className="w-16 h-16 min-w-[64px] bg-white p-1.5 rounded-xl flex items-center justify-center shadow-inner overflow-hidden">
          <img 
            src={cartData?.image || cartData?.images?.[0] || cartData?.thumbnail} 
            alt={cartData?.title} 
            className="max-h-full max-w-full object-contain"
          />
        </div>

        {/* TEXT DETAILS */}
        <div className="min-w-0 flex-1">
          <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/10 block w-max">
            {cartData?.category}
          </span>
          <h3 className="font-extrabold text-sm text-slate-100 mt-1 line-clamp-1 pr-2">
            {cartData?.title}
          </h3>
          
          {/* RATING BADGE */}
          {cartData?.rating?.rate && (
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-amber-400 font-bold">
              <span>⭐</span>
              <span>{cartData.rating.rate}</span>
              <span className="text-slate-500 font-medium">({cartData?.rating?.count || 0})</span>
            </div>
          )}
        </div>
      </div>

      {/* COLUMN 6 to 8: DELETE ACTION */}
      <div className="col-span-1 sm:col-span-3 flex justify-start sm:justify-center items-center h-full">
        {confirm ? (
          <div className="flex items-center gap-1 bg-rose-500/10 border border-rose-500/20 p-1 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
            <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider px-1.5 select-none">
              Sure?
            </span>
            <button 
              onClick={() => removedItem(cartData.id)}
              className="bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg active:scale-95 transition-all duration-200"
            >
              Yes
            </button>
            <button 
              onClick={() => setConfirm(false)}
              className="bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-[11px] font-extrabold uppercase px-2.5 py-1 rounded-lg active:scale-95 transition-all duration-200"
            >
              No
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setConfirm(true)}
            className="bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 hover:text-rose-300 border border-rose-900/50 hover:border-rose-700/80 text-xs font-extrabold uppercase tracking-wider px-4 py-2 rounded-xl active:scale-[0.98] transition-all duration-200 w-full sm:w-auto text-center"
          >
            Delete
          </button>
        )}
      </div>

      {/* COLUMN 9 to 10: QUANTITY COUNTER */}
      <div className="col-span-1 sm:col-span-2 flex justify-start sm:justify-center items-center">
        <div className="flex items-center gap-2.5 bg-slate-950 border border-slate-800/80 px-2 py-1 rounded-xl shadow-inner w-full sm:w-auto justify-between sm:justify-start">
          <button 
            onClick={() => quantityDecreased(cartData.id)}
            className="text-slate-400 hover:text-rose-400 font-black text-sm h-6 w-6 flex items-center justify-center rounded-lg hover:bg-slate-900 active:scale-90 transition-all duration-200"
          >
            —
          </button>
          <span className="font-extrabold text-slate-200 text-xs min-w-[16px] text-center select-none">
            {cartData.quantity}
          </span>
          <button 
            onClick={() => quantityIncreased(cartData.id)}
            className="text-slate-400 hover:text-emerald-400 font-black text-base h-6 w-6 flex items-center justify-center rounded-lg hover:bg-slate-900 active:scale-90 transition-all duration-200"
          >
            +
          </button>
        </div>
      </div>

      {/* COLUMN 11 to 12: PRICE DISPLAY */}
      <div className="col-span-1 sm:col-span-2 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center w-full border-t sm:border-t-0 border-slate-800/60 pt-2 sm:pt-0">
        <span className="text-xs text-slate-500 font-semibold sm:hidden">Price</span>
        <h2 className="text-lg font-black text-emerald-400">
          ₹{cartData?.price}
        </h2>
      </div>

    </div>
  );
};

export default Cartitems;