 import React, { useState } from 'react';
import { useNavigate } from 'react-router';  
import { addressSchema } from '../zod/Address';

const Address = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState({});
  
  const [address, setAddress] = useState({
    area: "",
    city: "",
    phone: "",
    pincode: ""
  });

  const handleSave = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await addressSchema.safeParse(address);
      if (!result.success) {
        const formettedErrors = result?.error?.issues?.reduce((accum, item) => {
          const fieldName = item.path[0];
          if (!accum[fieldName]) {
            accum[fieldName] = item.message;
          }
          return accum;
        }, {});
        setError(formettedErrors);
        return;
      }

      setError({});
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/payment');
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-900/70 backdrop-blur-md border border-slate-800 rounded-3xl p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Delivery Address
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Enter shipping information
        </p>
      </div>

      <form
        className="space-y-4"
        onSubmit={handleLogin}
      >
        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Address
          </label>
          <input
            type="text"
            name="area"
            placeholder="Street, Area, House No..."
            value={address.area}
            onChange={handleSave}
            className="
              w-full
              bg-slate-950
              border
              border-slate-800
              rounded-2xl
              px-4
              py-3
              outline-none
              focus:border-indigo-500
            "
          />
          {error.area && (
            <p className="text-red-400 text-xs mt-1">
              {error.area}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            placeholder="City..."
            value={address.city}
            onChange={handleSave}
            className="
              w-full
              bg-slate-950
              border
              border-slate-800
              rounded-2xl
              px-4
              py-3
              outline-none
              focus:border-indigo-500
            "
          />
            {error.city && (
            <p className="text-red-400 text-xs mt-1">
              {error.city}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number..."
            value={address.phone}
            onChange={handleSave}
            className="
              w-full
              bg-slate-950
              border
              border-slate-800
              rounded-2xl
              px-4
              py-3
              outline-none
              focus:border-indigo-500
            "
          />
            {error.phone && (
            <p className="text-red-400 text-xs mt-1">
              {error.phone}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-300 mb-2">
            Pincode
          </label>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode..."
            value={address.pincode}
            onChange={handleSave}
            className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 outline-non focus:border-indigo-500"
          />
            {error.pincode && (
            <p className="text-red-400 text-xs mt-1">
              {error.pincode}
            </p>
          )}
        </div>
        
        <button  type="submit" disabled={isLoading}
          className={`w-full  py-3  rounded-2xl font-bold ${isLoading?'bg-slate-900':'bg-indigo-600 hover:bg-indigo-500'} transition`  }>
          {isLoading ? (<div className='flex flex-wrap  gap-4 justify-center items-center'>
          <div className='border-l-2 border-t-2 border-white animate-spin h-6 w-6  rounded-full'></div>
          <p>Processing...</p>
        </div>
        ) : "Save Address"}
        </button>
      </form>
    </div>
  );
};
export default Address;