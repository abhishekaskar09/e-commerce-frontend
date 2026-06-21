 import React, { useEffect, useState } from 'react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
     const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 p-4 md:p-10 font-sans selection:bg-indigo-500/30">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/60 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white bg-gradient-to-r bg-clip-text text-transparent from-white via-slate-200 to-slate-500">
              Your Orders
            </h1>
            <p className="text-sm text-slate-400 mt-1 font-medium">
              Check the status of recent orders, manage returns, and track shipments.
            </p>
          </div>
          {/* Total Orders Counter */}
          <div className="self-start md:self-center bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs font-semibold text-slate-300">
            Total Orders: <span className="text-indigo-400 font-bold ml-1">{orders.length}</span>
          </div>
        </div>

        {/* Orders Stack */}
        <div className="space-y-8">
          
          {/* ⚡ If no orders found */}
          {orders.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-2xl">
              <p className="text-slate-400 font-medium">No orders found yet.</p>
            </div>
          ) : (
             orders.map((order) => (
              <div key={order.id} className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 hover:border-slate-700/60">
                
                {/* Meta Top Header */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-900/90 px-6 py-5 border-b border-slate-800/80 text-xs">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Date Placed</p>
                    <p className="text-slate-200 font-semibold">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-indigo-400 font-mono font-bold uppercase">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Paid</p>
                    <p className="text-emerald-400 font-black text-sm">₹{order.totalPrice.toFixed(2)}</p>
                  </div>
                  {/* Status Badge According to Order Status */}
                  <div className="text-right flex flex-col items-start sm:items-end justify-center">
                    <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full shadow-inner ${
                      order.status === 'Delivered' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${order.status === 'Delivered' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* Order Items Wrapper */}
                <div className="p-6 divide-y divide-slate-800/40">
                  
                   {order.items && order.items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 pt-5 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-5 w-full sm:w-auto">
                        {/* Image Frame */}
                        <div className="w-20 h-20 bg-slate-950 border border-slate-800 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center text-[10px] text-slate-600 font-mono relative">
                          <span className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-60"></span>
                           <img src={item?.thumbnail||item?.image||item?.images} alt={item?.title} />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white tracking-wide truncate hover:text-indigo-400 transition-colors cursor-pointer">
                            {item.name}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                            {item.size && (
                              <span className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-[10px] font-semibold text-slate-300">Size: {item.size}</span>
                            )}
                            <span className="text-slate-600">•</span>
                            <span>Qty: {item.quantity || item.qty}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t border-slate-800/30 sm:border-0 pt-3 sm:pt-0">
                        <p className="text-sm font-black text-slate-200">₹{item.price}</p>
                        <button className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors mt-1">Buy it again</button>
                      </div>
                    </div>
                  ))}

                </div>
              </div>
            ))
          )}

        </div>
      </div>
    </div>
  );
};

export default OrderHistory;