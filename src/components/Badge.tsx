const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "bg-blue-100 text-blue-800" }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);



export default Badge;