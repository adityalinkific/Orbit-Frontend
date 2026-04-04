import { useEffect } from "react";

export default function Toast({ msg, onClose, className = "" }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed z-[9999] top-6 right-6 bg-[#ff4d4f] text-white px-4 py-2 rounded shadow-xl animate-in fade-in slide-in-from-right-10 duration-300 w-fit h-fit leading-tight ${className}`}>
      {msg}
    </div>
  );
}
