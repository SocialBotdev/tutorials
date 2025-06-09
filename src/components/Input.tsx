import type { ChangeEvent } from "react";

const Input: React.FC<{ type?: string; placeholder: string; value: string; onChange: (e: ChangeEvent<HTMLInputElement>) => void; className?: string }> = ({ type = "text", placeholder, value, onChange, className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  />
);

export default Input;