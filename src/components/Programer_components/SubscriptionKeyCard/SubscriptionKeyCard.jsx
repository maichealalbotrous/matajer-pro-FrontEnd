import React from 'react';
import { Copy, ShieldCheck, Plus } from 'lucide-react';

const SubscriptionGrid = ({ keysData }) => {


  const data = keysData;

  const statusStyles = {
    نشط: "text-green-500 bg-green-50",
    منتهي: "text-red-500 bg-red-50",
    "غير مفعل": "text-slate-400 bg-slate-50"
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {data.map((keyItem, index) => (
        <div key={index} className="bg-white border border-slate-100 p-6 rounded-[40px] relative group hover:border-blue-200 transition-all shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <button className="p-2 text-slate-300 hover:text-[#3198c1] transition-colors"><Copy size={20} /></button>
            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${keyItem.type === 'ENTERPRISE' ? 'bg-[#3198c1] text-white' : 'bg-[#0f172a] text-white'}`}>
              {keyItem.type}
            </span>
          </div>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-black text-[#0f172a] tracking-wider">{keyItem.id}</h3>
            <p className="text-[10px] font-bold text-slate-300 mt-2">تاريخ الانتهاء</p>
            <p className="text-sm font-black text-[#0f172a]">{keyItem.expiryDate}</p>
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
            <span className={`text-[11px] font-black px-4 py-1 rounded-xl ${statusStyles[keyItem.status]}`}>{keyItem.status}</span>
            <ShieldCheck size={18} className="text-slate-200" />
          </div>
        </div>
      ))}
      <button className="border-2 border-dashed border-blue-100 rounded-[40px] flex flex-col items-center justify-center p-10 hover:bg-blue-50/50 transition-all group min-h-[220px]">
        <div className="w-14 h-14 bg-[#3198c1] rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
          <Plus size={30} />
        </div>
        <span className="text-[#3198c1] font-black">توليد مفاتيح جديدة</span>
      </button>
    </div>
  );
};

export default SubscriptionGrid;