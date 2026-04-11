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
        <p className="description text-slate-500 font-medium text-sm font-body">
          نظام إدارة المبيعات الراقي
        </p>
    </main>
  )
}

export default AuthHeader;