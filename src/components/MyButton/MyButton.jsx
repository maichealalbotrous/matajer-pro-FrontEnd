import { ArrowLeft, ArrowRight } from "lucide-react";

function MyButton({title , position}) {
  return (
    <button className="
      w-full h-14 px-6
      flex items-center justify-center gap-3
      bg-[#050b1a] 
      text-white 
      text-[16px] font-bold
      rounded-2xl 
      shadow-xl shadow-slate-200
      transition-all duration-300
      hover:bg-slate-900 
      hover:shadow-2xl hover:-translate-y-0.5
      active:scale-[0.98]
      group
       cursor-pointer
        hover:scale-110
    ">
      {
      position === "left"  ? <ArrowLeft className="w-5 h-5" strokeWidth={1.5}/> : <ArrowRight className=" w-5 h-5 "strokeWidth={1.5}/>
     }
      
      <span>{title}</span>
    </button>
  );
}

export default MyButton;