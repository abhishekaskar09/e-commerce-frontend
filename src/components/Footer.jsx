import React from 'react'
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-slate-900 border-t border-slate-800 text-slate-400 font-sans mt-auto'>
      
      {/* 1. MAIN CONTENT GRID */}
      <div className='max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8'>
        
        {/* COMPANY INFO */}
        <div className='flex flex-col gap-4'>
          <h2 className='uppercase font-extrabold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent text-xl'>
            Product Seller
          </h2>
          <p className='text-sm leading-relaxed text-slate-400'>
            Your one-stop destination for premium tech gear and minimalist developer setups. Upgrade your workspace today.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-white font-bold text-base tracking-wide'>Quick Links</h3>
          <ul className='flex flex-col gap-2 text-sm'>
            <li className='hover:text-indigo-400 cursor-pointer transition-colors duration-200'>Home</li>
            <li className='hover:text-indigo-400 cursor-pointer transition-colors duration-200'>All Products</li>
            <li className='hover:text-indigo-400 cursor-pointer transition-colors duration-200'>Featured Items</li>
            <li className='hover:text-indigo-400 cursor-pointer transition-colors duration-200'>Contact Us</li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div className='flex flex-col gap-3'>
          <h3 className='text-white font-bold text-base tracking-wide'>Contact</h3>
          <ul className='flex flex-col gap-2 text-sm text-slate-400'>
            <li className='flex items-center gap-2'>
              <FaMapMarkerAlt className='text-indigo-400' />NandBagh, Indore, MP
            </li>
            <li className='flex items-center gap-2'>
              <FaPhoneAlt className='text-indigo-400' /> +91 7225808772
            </li>
            <li className='flex items-center gap-2'>
              <FaEnvelope className='text-indigo-400' /> abhishekasker084@gmail.com
            </li>
          </ul>
        </div>

        {/* SOCIAL MEDIA SECTION (चमचमाते हुए सोशल आइकन्स) */}
        <div className='flex flex-col gap-4'>
          <h3 className='text-white font-bold text-base tracking-wide'>Follow Us</h3>
          <p className='text-sm text-slate-400'>Stay connected on our social handles for daily updates.</p>
          
          {/* ICON CONTAINERS WITH HOVER GLOW */}
          <div className='flex items-center gap-3 mt-1'>
            
            <a href="#" className='h-9 w-9 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 active:scale-90'>
              <FaFacebookF className='text-sm' />
            </a>

            <a href="#" className='h-9 w-9 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 active:scale-90'>
              <FaTwitter className='text-sm' />
            </a>

            <a href="#" className='h-9 w-9 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 active:scale-90'>
              <FaInstagram className='text-sm' />
            </a>

            <a href="#" className='h-9 w-9 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-300 active:scale-90'>
              <FaGithub className='text-sm' />
            </a>

          </div>
        </div>

      </div>

      {/* 2. BOTTOM COPYRIGHT BAR */}
      <div className='border-t border-slate-800/60 bg-slate-950/40 py-6 text-center text-xs text-slate-500'>
        <p>© {new Date().getFullYear()} Product Seller. All rights reserved. Designed for developers.</p>
      </div>

    </footer>
  )
}

export default Footer;