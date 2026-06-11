import { BookOpen } from "lucide-react";

function AuthHeader() {
  return (
    <main className="w-full mt-8 flex flex-col items-center justify-center text-center antialiased">
        
        <div className="Book-Logo w-16 h-16 bg-[#050b1a] rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-slate-200/50">
          <BookOpen className="text-white w-8 h-8" strokeWidth={1.5} />
        </div>
        <h1 className="Title text-2xl font-black text-[#0f172a] tracking-tight mb-2 font-headline">
          The Editorial POS
        </h1>
       <div className="flex flex-col gap-1">
  <p className="description text-slate-500 font-medium text-sm font-body">
    لإدارة المبيعات  Sanad
  </p>
  
  {/* توقيع المهندس ميخائيل البصري الأنيق */}
  <div className="opacity-30 hover:opacity-90 transition-opacity duration-300 select-none mt-1">
    <span className="text-[10px] font-mono tracking-widest text-slate-600 uppercase">
      Crafted by{" "}
      <span className="font-bold text-slate-600 hover:text-[#3198c1] transition-colors duration-200">
        ENG.Michael_Alboutros
      </span>
    </span>
  </div>
</div>
    </main>
  )
}

export default AuthHeader;