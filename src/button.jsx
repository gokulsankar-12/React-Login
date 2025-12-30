import React from 'react';

const Button = ({ onClick, children, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 py-3 rounded-xl font-semibold hover:bg-blue-700 transition text-white mt-4"
    >
      {children}
    </button>
  );
};

export default Button;