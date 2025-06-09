import type { ChangeEvent } from "react";

const Textarea: React.FC<{ placeholder: string; value: string; onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void; className?: string }> = ({ placeholder, value, onChange, className = "" }) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={5}
    readOnly // Make it read-only for output
    className={`flex min-h-[80px] w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 font-mono ${className}`}
  ></textarea>
);

export default Textarea;