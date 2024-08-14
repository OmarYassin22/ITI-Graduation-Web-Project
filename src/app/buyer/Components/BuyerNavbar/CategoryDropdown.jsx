'use client';

import { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

// const CategoryDropdown = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.classList.add('overlay-active');
//     } else {
//       document.body.classList.remove('overlay-active');
//     }

//     return () => {
//       document.body.classList.remove('overlay-active');
//     };
//   }, [isOpen]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div ref={dropdownRef} className="relative">
//       <div
//         className="flex items-center text-primary border-2 border-primary px-4 py-2 rounded cursor-pointer"
//         onClick={toggleDropdown}
//       >
//         <button className="font-bold text-lg">Categories</button>
//         <IoIosArrowDown size={30} />
//       </div>

//       {isOpen && (
//         <>
//           <div
//             ref={overlayRef}
//             className="fixed inset-0 bg-black bg-opacity-50 z-40"
//             style={{ pointerEvents: 'none' }}
//           ></div>
//           <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50">
//             {/* Add your dropdown content here */}
//             <div className="p-4">
//               <h3 className="font-bold mb-2">Category List</h3>
//               <ul>
//                 <li>Category 1</li>
//                 <li>Category 2</li>
//                 <li>Category 3</li>
//                 {/* Add more categories as needed */}
//               </ul>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CategoryDropdown;

const CategoryDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center text-primary border-2 border-primary px-4 py-2 rounded cursor-pointer"
        onClick={toggleDropdown}
      >
        <button className="font-bold text-lg">Categories</button>
        {isOpen ? <IoIosArrowUp size={30} /> : <IoIosArrowDown size={30} />}
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleDropdown}
          ></div>
          <div
            className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg z-50"
          >
            {/* Add your dropdown content here */}
            <div className="p-4">
              <h3 className="font-bold mb-2">Category List</h3>
              <ul>
                <li>Category 1</li>
                <li>Category 2</li>
                <li>Category 3</li>
                {/* Add more categories as needed */}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDropdown;
