import React from 'react';
import { TrendingUp, BarChart3 } from 'lucide-react';

function TopProfitCard({ data = [] }) {
  if (data.length === 0) return (
    <div className="bg-white rounded-[32px] p-8 text-center text-slate-400 font-bold border border-slate-50 shadow-sm" dir="rtl">
      لا توجد بيانات مبيعات أو أرباح مسجلة خلال الفترة المحددة.
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-6">
      {data.map((item, idx) => (
        <div key={idx} className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-md transition-all group" dir="rtl">
          <div className="flex justify-between items-center mb-6 gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all shrink-0">
                <TrendingUp size={22} />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#0f172a] leading-tight">{item.product_name}</h3>
                <p className="text-xs text-slate-400 font-bold mt-0.5">
                  {item.variant_name} 
                  {item.color && <span className="inline-flex items-center gap-1 mr-1"> • اللون: <span className="w-2 h-2 rounded-full inline-block border border-slate-200" style={{ backgroundColor: item.color }} /></span>}
                </p>
              </div>
            </div>
            <div className="text-left shrink-0">
              <span className="text-[10px] font-black text-slate-400 block mb-1">إجمالي الصافي</span>
              <span className="text-xl font-black text-green-600 tabular-nums">
                +{Number(item.total_profit).toLocaleString('en-US')} <small className="text-[10px] font-black">ل.س</small>
              </span>
            </div>
          </div>

          {/* أداء المقاسات المباعة */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-50 pb-2">
              <p className="text-[10px] font-black text-slate-400 flex items-center gap-1">
                <BarChart3 size={12} /> مبيعات المقاسات وأرباحها
              </p>
              <span className="text-[10px] font-black text-slate-400">
                إجمالي القطع المباعة: <span className="text-green-600 font-black tabular-nums">{item.total_sold}</span>
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {item.sizes_performance?.map((size, sIdx) => (
                <div key={sIdx} className="bg-slate-50/70 px-3 py-1.5 rounded-xl flex items-center gap-2.5 border border-slate-50 hover:bg-white hover:border-slate-200 transition-all">
                  <span className="text-xs font-black text-[#0f172a] uppercase">قياس {size.size}</span>
                  <div className="w-[1px] h-3 bg-slate-200" />
                  <span className="text-[11px] font-bold text-slate-500 tabular-nums">{size.qty} قطع</span>
                  <span className="text-[11px] font-black text-green-600 tabular-nums">+{Number(size.profit).toLocaleString('en-US')} ل.س</span>
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