import React from 'react';
import { AlertTriangle, Timer } from 'lucide-react';

function LowStockAlert({ items = [] }) {
  return (
    <div className="space-y-4" dir="rtl">
      {items.length === 0 ? (
        <div className="bg-slate-50 rounded-[24px] p-8 text-center text-slate-400 font-bold">
          لا توجد تنبيهات حالياً، المخزون جيد ✅
        </div>
      ) : (
        items.map((item, idx) => (
          <div key={idx} className="bg-white p-5 rounded-[24px] border border-slate-100 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.quantity === 0 ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
                <AlertTriangle size={18} />
              </div>
              <div>
                <h4 className="text-sm font-black text-[#0f172a]">{item.product_name}</h4>
                <p className="text-[10px] text-slate-400 font-bold">{item.variant_name} • {item.color} • {item.size}</p>
              </div>
            </div>
            <div className="text-left flex flex-col items-end gap-1">
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.quantity === 0 ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                {item.status}
              </span>
              <span className="text-xs font-black text-slate-600">{item.quantity} قطع متبقية</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default LowStockAlert;