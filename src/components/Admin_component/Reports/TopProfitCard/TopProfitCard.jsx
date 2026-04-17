import React from 'react';
import { TrendingUp, BarChart3, ArrowUpRight } from 'lucide-react';

function TopProfitCard({ data = [] }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {data.map((item, idx) => (
        <div key={idx} className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-md transition-all group" dir="rtl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0f172a]">{item.variant_name}</h3>
                <p className="text-xs text-slate-400 font-bold">{item.product_name} • {item.color}</p>
              </div>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-black text-slate-400 block mb-1">إجمالي الربح</span>
              <span className="text-xl font-black text-green-600">+{item.total_profit?.toLocaleString()} <small className="text-[10px]">ر.س</small></span>
            </div>
          </div>

          {/* أداء المقاسات */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <p className="text-[10px] font-black text-slate-400 flex items-center gap-1">
                <BarChart3 size={12} /> أداء المبيعات حسب القياس
              </p>
              <span className="text-[10px] font-black text-slate-400">الكمية المباعة: {item.total_sold}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {item.sizes_performance.map((size, sIdx) => (
                <div key={sIdx} className="bg-slate-50 px-4 py-2 rounded-xl flex items-center gap-3 border border-transparent hover:border-slate-200 transition-all">
                  <span className="text-xs font-black text-[#0f172a] uppercase">M {size.size}</span>
                  <div className="w-[1px] h-3 bg-slate-200" />
                  <span className="text-[11px] font-bold text-slate-500">{size.qty} مبيعات</span>
                  <span className="text-[11px] font-black text-green-600">+{size.profit} ر.س</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TopProfitCard;