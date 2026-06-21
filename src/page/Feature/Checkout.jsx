import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CheckoutItems from "./CheckoutItems";
import Address from "../../Components/Address";

const Checkout = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,0);

  const price = cart.reduce(
    (total, item) => total + item.price * item.quantity,0);

  const gstTax = price * 0.18;
  const totalPrice = price + gstTax;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[140px] rounded-full -top-20 -left-20"></div>
      <div className="absolute w-[400px] h-[400px] bg-violet-600/20 blur-[140px] rounded-full bottom-0 right-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-10">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-black">
            Secure Checkout
          </h1>
          <p className="text-slate-400 mt-2">
            Review your order and complete purchase
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* LEFT SIDE: FIXED ADDRESS SECTION */}
          <div className="lg:col-span-1 sticky top-10 h-fit">
            <Address />
          </div>

          {/* RIGHT SIDE: SCROLLABLE ITEMS + SINGLE LINE PRICE */}
          <div className="lg:col-span-2 bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">

            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  Cart Items
                </h2>
                <span className="bg-indigo-600 px-4 py-2 rounded-xl text-sm font-bold">
                  {totalItems} Items
                </span>
              </div>

              {/* Scrollable Items Container (Max height set so scroll triggers) */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <CheckoutItems
                    key={item.id}
                    CheckoutData={item}
                  />
                ))}
              </div>
            </div>

            {/* SINGLE LINE TOTAL & PROCESS BUTTON (Outside Scroll, Bottom of the list) */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">

              {/* The required clean single-line calculation display */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-sm md:text-base text-slate-300 bg-slate-950/40 p-4 rounded-2xl border border-slate-800/50">
                <div>
                  <span>Items: <strong className="text-white">{totalItems}</strong></span>
                  <span className="mx-3 text-slate-700">|</span>
                  <span>Subtotal: <strong className="text-white">₹{price.toFixed(2)}</strong></span>
                  <span className="mx-3 text-slate-700">|</span>
                  <span>GST (18%): <strong className="text-white">₹{gstTax.toFixed(2)}</strong></span>
                </div>
                <div>
                  <span className="text-lg">Total: <strong className="text-emerald-400 text-xl font-black">₹{totalPrice.toFixed(2)}</strong></span>
                </div>
              </div> 
            </div> 
          </div> 
        </div> 
      </div>
    </div>
  );
};

export default Checkout;