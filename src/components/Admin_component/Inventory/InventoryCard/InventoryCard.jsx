import { Link } from 'react-router-dom';
import { Package, Layers } from 'lucide-react';

function InventoryCard({ InventoryData }) {
  return (
    <Link to="/Inventory" className="block bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 transition-all duration-300 hover:shadow-md h-full min-h-[180px] flex flex-col justify-between" dir="rtl">
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-black text-[#0f172a] tracking-tight">{InventoryData.title}</h3>
          <span className={`text-[11px] font-black px-2 py-0.5 rounded-full w-fit ${InventoryData.type === "warning" ? "bg-red-50 text-red-500 border border-red-100/50" : "text-slate-400"}`}>
            {InventoryData.subtitle}
          </span>
        </div>
        <div className={`p-3 rounded-2xl ${InventoryData.type === "warning" ? "bg-red-50 text-red-400" : "bg-slate-50 text-slate-400"}`}>
          {InventoryData.type === "warning" ? <Package size={24} /> : <Layers size={24} />}
        </div>
      </div>
      <div className="flex flex-col items-start mt-6">
        <span className="text-4xl font-black text-[#0f172a] tracking-tighter">{InventoryData.count}</span>
        <p className="text-[10px] font-bold text-slate-400 mt-1">إجمالي المخزون المتاح</p>
      </div>
    </Link>
  );
}
export default InventoryCard;