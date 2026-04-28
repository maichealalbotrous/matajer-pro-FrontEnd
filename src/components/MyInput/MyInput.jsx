import { Input } from "../ui/input";

export default function MyInput({ LabelTitle, Icon, ...props }) {
  return (
    <div className="w-full flex flex-col gap-2 font-sans" dir="rtl">
      {LabelTitle && (
        <label className="text-[13px] font-bold text-white px-1">
          {LabelTitle}
        </label>
      )}

      <div className="relative group w-full">

        {Icon && (
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0f172a] transition-colors z-10">
            {Icon}
          </div>
        )}
        
        <Input
          {...props}
          className={`h-14 w-full rounded-[24px] bg-white border border-slate-100 shadow-sm focus-visible:ring-4 focus-visible:ring-[#0f172a]/5 focus-visible:border-slate-200 transition-all duration-300 placeholder:text-black text-black font-bold 
            ${Icon ? 'pr-14' : 'pr-6'} pl-6 text-right`} 
        />
      </div>
    </div>
  );
}