import { ArrowLeft, ArrowRight } from "lucide-react";

// أضفنا خاصية className و onClick و بقية الـ props
function MyButton({ title, position, className, onClick, ...props }) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2
        transition-all duration-300
        active:scale-[0.95]
        cursor-pointer
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