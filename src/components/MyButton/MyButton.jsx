import { ArrowLeft, ArrowRight } from "lucide-react";

function MyButton({ title, position, className, onClick, ...props }) {
  return (
    <button 
      onClick={onClick}
      className={`
      w-full 
        h-14 
    
        font-bold 
        text-lg 
        rounded-2xl 
        shadow-[0_10px_20px_-5px_rgba(15,23,42,0.3)] 
        hover:shadow-[0_20px_25px_-5px_rgba(15,23,42,0.3)] 
        active:scale-[0.98] 
        transition-all 
        duration-300 
        ease-out
        flex items-center justify-center
        ${className} 
      `}
      {...props}
    >
      {position === "left" && <ArrowLeft className="w-4 h-4" />}
      <span>{title}</span>
      {position === "right" && <ArrowRight className="w-4 h-4" />}
    </button>
  );
}

export default MyButton;