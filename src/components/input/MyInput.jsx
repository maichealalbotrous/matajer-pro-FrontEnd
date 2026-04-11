import { Input } from "../ui/input";

export default function MyInput({ LabelTitle, ...props }) {
  return (
    <div className="w-full flex flex-col gap-2 font-sans" dir="rtl">
      <label className="text-[13px] font-bold text-slate-700 px-1">
        {LabelTitle}
      </label>

      <div className="relative group">
        <Input
          {...props}
          className="h-14 w-full rounded-[1.2rem] bg-[#f3f4f6] border-none pr-4 pl-12 text-right focus-visible:ring-2 focus-visible:ring-slate-200 focus-visible:bg-white transition-all duration-300 placeholder:text-slate-400"
        />
        
      </div>
    </div>
  );
}