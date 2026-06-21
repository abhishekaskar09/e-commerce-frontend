 import React from "react";

const CheckoutItems = ({ CheckoutData }) => {
  return (
    <div
      className="
      bg-slate-950/80
      border
      border-slate-800
      rounded-3xl
      p-5
      hover:border-indigo-500/40
      transition-all
      duration-300
      "
    >
      <div className="flex flex-col sm:flex-row gap-5 items-center">

        {/* IMAGE */}
        <div
          className="
          w-28
          h-28
          bg-white
          rounded-2xl
          p-3
          flex
          items-center
          justify-center
          shadow-lg
          "
        >
          <img
            src={
              CheckoutData?.image ||
              CheckoutData?.images?.[0] ||
              CheckoutData?.thumbnail
            }
            alt={CheckoutData?.title}
            className="
            w-full
            h-full
            object-contain
            "
          />
        </div>

        {/* CONTENT */}
        <div className="flex-1 w-full">
          <span
            className="
            inline-block
            px-3
            py-1
            rounded-full
            text-xs
            font-bold
            bg-indigo-500/15
            text-indigo-300
            mb-3
            "
          >
            {CheckoutData?.category}
          </span>

          <h2
            className="
            text-lg
            md:text-xl
            font-bold
            text-white
            line-clamp-2
            "
          >
            {CheckoutData?.title}
          </h2>

          <div className="flex items-center gap-3 mt-4">
            <div
              className="
              bg-slate-900
              border
              border-slate-700
              px-4
              py-2
              rounded-xl
              "
            >
              <span className="text-slate-400 text-xs">
                Qty
              </span>
              <h4 className="font-bold text-white">
                {CheckoutData.quantity}
              </h4>
            </div>

            <div
              className="
              bg-emerald-500/10
              border
              border-emerald-500/20
              px-4
              py-2
              rounded-xl
              "
            >
              <span className="text-emerald-300 text-xs">
                Price
              </span>
              <h4
                className="
                font-black
                text-emerald-400
                text-lg
                "
              >
                ₹{CheckoutData.price}
              </h4>
            </div>
          </div>
        </div>

        {/* TOTAL */}
        <div
          className="
          flex
          flex-col
          items-end
          min-w-[120px]
          "
        >
          <span className="text-slate-500 text-sm">
            Total
          </span>
          <h2
            className="
            text-2xl
            font-black
            text-white
            "
          >
            ₹
            {(
              CheckoutData.price *
              CheckoutData.quantity
            ).toFixed(2)}
          </h2>
        </div>

      </div>
    </div>
  );
};

export default CheckoutItems;