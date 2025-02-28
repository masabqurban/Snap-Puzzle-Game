import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-indigo-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-indigo-200 text-sm">
            &copy; {new Date().getFullYear()} Snap Puzzle Game. All rights reserved.
          </p>
          <p className="text-indigo-200 text-sm mt-2 md:mt-0">
            Created by Masab Qurban
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;