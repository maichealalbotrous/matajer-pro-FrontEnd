import { User, Bell, BookOpen } from "lucide-react";

function BranchHeader() {
  return (
    <div className="w-full bg-[#f8fafc] min-h-[300px]" dir="rtl">
      <nav className="w-full h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 md:px-12 flex items-center justify-between shadow-sm">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#050b1a] rounded-xl flex items-center justify-center shadow-lg shadow-slate-200">
            <BookOpen className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-black text-[#0f172a] tracking-tight">
            The Editorial POS
          </span>
        </div>

        <div className="flex items-center gap-5">
          <button className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-[#0f172a] hover:bg-slate-100 transition-all">
            <Bell className="w-5 h-5 cursor-pointer" />
          </button>
          <button className="p-2.5 bg-slate-50 rounded-full text-slate-400 hover:text-[#0f172a] hover:bg-slate-100 transition-all border border-slate-100">
            <User className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </nav>


      <header className="flex flex-col items-center justify-center text-center mt-16 px-4 animate-in fade-in slide-in-from-bottom duration-700">
        <h1 className="text-4xl md:text-5xl font-black text-[#0f172a] mb-6 tracking-tight leading-tight">
          اختر الفرع للبدء
        </h1>
        <p className="max-w-2xl text-slate-400 font-medium text-base md:text-lg leading-relaxed">
          مرحباً بك مجدداً، يرجى اختيار الفرع الذي ترغب في إدارته اليوم للوصول إلى لوحة التحكم والبيانات الخاصة به.
        </p>
      </header>
    </div>
  );
}

export default BranchHeader;