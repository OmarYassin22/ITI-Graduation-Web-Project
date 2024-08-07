import React from 'react';
import { FaFacebookF, FaTwitter, FaGoogle, FaGithub } from 'react-icons/fa';

function Footer() {
  return (
    <div>
      <footer className="footer bg-sky-950 py-10 flex justify-center items-center flex-col">
        <div className="footer-icon">
          <ul className='flex space-x-4 mb-4 text-cyan-700 '>
            <li className='hover:text-white duration-300'><a href="#"><FaFacebookF size={24} /></a></li>
            <li className='hover:text-white duration-300'><a href="#"><FaTwitter size={24} /></a></li>
            <li className='hover:text-white duration-300'><a href="#"><FaGoogle size={24} /></a></li>
            <li className='hover:text-white duration-300'><a href="#"><FaGithub size={24} /></a></li>
          </ul>
        </div>
        <p className="copy-right text-white">
          Copy Right 2018 © By <span className='text-cyan-600'>Friends Team</span> All Rights Reserved
        </p>
      </footer>
    </div>
  );
}

export default Footer;
