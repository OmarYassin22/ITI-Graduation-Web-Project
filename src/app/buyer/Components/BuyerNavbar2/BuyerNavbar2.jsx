'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const BuyerNavbar2 = () => {
  const [activeLink, setActiveLink] = useState('home');

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  const getLinkClassName = (linkName) => {
    return `py-3 ${
      activeLink === linkName
        ? 'text-primary border-b-4 border-primary font-bold'
        : 'text-gray-700 hover:text-primary transition-colors duration-200'
    }`;
  };

  return (
    <ul
      className="flex items-center px-20 py-3 border-b-2 text-lg"
      style={{ position: 'relative', top: '-68px', backgroundColor: 'white' }}
    >
      <li className="mr-20">
        <Link
          href="/buyer"
          onClick={() => handleActiveLink('home')}
          className={getLinkClassName('home')}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/buyer/learning"
          onClick={() => handleActiveLink('learning')}
          className={getLinkClassName('learning')}
        >
          My Learning
        </Link>
      </li>
    </ul>
  );
};

export default BuyerNavbar2;
