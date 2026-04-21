import { Store, ArrowUpRight } from 'lucide-react';

function BranchesOverviewCard({BranchCount} ) {
  return (
    <div className=" cursor-pointer bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 relative group" dir="rtl">
      <ArrowUpRight className="absolute top-6 right-6 text-slate-300 group-hover:text-[#0f172a] cursor-pointer transition-colors" size={24} />
      
      <div className="flex flex-col items-center text-center mt-4">
        <div className="w-16 h-16 bg-[#050b1a] rounded-[20px] flex items-center justify-center text-white mb-4 shadow-xl shadow-black/10">
          <Store size={30} />
        </div>
        <h3 className="text-2xl font-black text-[#0f172a] mb-2">الفروع</h3>
        <p className="text-sm text-slate-400 font-bold leading-relaxed max-w-[200px]">
          إدارة {BranchCount} فرعاً نشطاً. مراقبة الأداء المباشر لكل موقع.
        </p>
      </div>

      <div className=" grid grid-cols-1 gap-4 mt-10">
        <div className="bg-slate-50 rounded-3xl p-4 flex flex-col items-center justify-center">
          <span className="text-[10px] text-slate-400 font-black mb-1">حالة الشبكة</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-black text-[#0f172a]">متصل بالكامل</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default BranchesOverviewCard;