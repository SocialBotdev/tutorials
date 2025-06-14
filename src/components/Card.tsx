import React from "react";



const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm p-6 ${className}`}>
    {children}
  </div>
);


export default Card;