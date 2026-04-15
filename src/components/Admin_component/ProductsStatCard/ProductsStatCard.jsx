import { Package, Layers } from 'lucide-react';

function ProductsStateCard({ProductsData}) {
  return (
    <div className="cursor-pointer bg-white rounded-[32px] p-8 shadow-sm border border-slate-50" dir="rtl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-black text-[#0f172a]">{ProductsData.title}</h3>
          <span className={`text-[10px] font-black mt-1 ${ProductsData.type === "warning" ? "text-red-500" : "text-slate-400"}`}>
            {ProductsData.subtitle}
          </span>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
          {ProductsData.type === "warning" ? <Package size={20} /> : <Layers size={20} />}
        </div>
      </div>
      <div className="flex flex-col items-end">
        <span className="text-4xl font-black text-[#0f172a] tracking-tighter">{ProductsData.count}</span>
        <span className="text-[10px] font-bold text-slate-400 mt-1">إجمالي القطع المخزنة</span>
      </div>
    </div>
  );
}
export default ProductsStateCard;