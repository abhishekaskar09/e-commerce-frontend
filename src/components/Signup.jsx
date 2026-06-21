import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { signupSchema } from '../zod/SignupSchema';
import { AuthContext } from '../context/AuthContext';

import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

const Signup = () => {

  const { dispatch, setSignup, signup } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();



  const handleSave = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    if (error[e.target.name]) {
      setError({ ...error, [e.target.name]: "" });
    }
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signupSchema.safeParse(signup);

      if (!result.success) {
        const formettedErrors = result?.error?.issues.reduce((accum, item) => {
          const fieldName = item.path[0];
          if (!accum[fieldName]) {
            accum[fieldName] = item.message;
          }
          return accum;
        }, {});

        return setError(formettedErrors);
      }

      setError({});

      setIsLoading(true);
      setTimeout(() => {
        const mockUserData = {
          name: signup.name,
          email: signup.email,
          password: signup.password,
        }

        dispatch({
          type: 'SIGN_UP',
          payload: mockUserData,
        });

        setIsLoading(false);
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800/80 p-8 rounded-2xl shadow-xl shadow-slate-950/50 backdrop-blur-sm">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1.5 uppercase tracking-wider">
            Join us to get original premium gear
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>

          {/* 1. FULL NAME */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              className={`bg-slate-950 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all duration-200 ${error.name ? 'border-rose-500/80 focus:ring-rose-500/30' : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/30'
                }`}
              disabled={isLoading}

              value={signup.name}
              onChange={handleSave}
            />
            {error.name && <p className="text-xs text-rose-400 font-medium px-1 mt-0.5">{error.name}</p>}
          </div>

          {/* 2. EMAIL ADDRESS */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              className={`bg-slate-950 border rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 transition-all duration-200 ${error.email ? 'border-rose-500/80 focus:ring-rose-500/30' : 'border-slate-800 focus:border-indigo-500/80 focus:ring-indigo-500/30'
                }`}
              disabled={isLoading}

              value={signup.email}
              onChange={handleSave}
            />
            {error.email && <p className="text-xs text-rose-400 font-medium px-1 mt-0.5">{error.email}</p>}
          </div>

          {/* 3. PASSWORD */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Password
              </label>
            </div>

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/30 transition-all duration-200"
                disabled={isLoading}
                value={signup.password}
                onChange={handleSave}
              />

              <button
                type="button" // ⚡  
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
              >
                {showPassword ? <FaEyeSlash className="h-4 w-4" /> : <FaEye className="h-4 w-4" />}
              </button>
            </div>

            {error.password && <p className="text-xs text-rose-400 font-medium px-1 mt-0.5">{error.password}</p>}
          </div>

          {/* TERMS & CONDITIONS */}
          <div className="flex items-center gap-2 mt-1 px-0.5">
            <input
              type="checkbox"
              id="terms"
              className="accent-indigo-600 h-4 w-4 rounded border-slate-800 bg-slate-950 text-indigo-600 focus:ring-0 cursor-pointer"
              disabled={isLoading}

            />
            <label htmlFor="terms" className="text-xs text-slate-400 font-medium cursor-pointer select-none">
              I agree to the <a href="#" className="text-indigo-400 font-semibold hover:underline">Terms</a> and <a href="#" className="text-indigo-400 font-semibold hover:underline">Privacy Policy</a>
            </label>
          </div>

          {/* PROCESSING BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full mt-2 text-white font-extrabold text-sm uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 ${isLoading
                ? 'bg-indigo-600/50 cursor-not-allowed text-indigo-200'
                : 'bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] shadow-lg shadow-indigo-600/10'
              }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Register Now</span>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
          <p className="text-xs text-slate-500 font-medium">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-bold transition-colors">
              Sign In
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;