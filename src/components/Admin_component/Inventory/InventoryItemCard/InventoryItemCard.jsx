import React from 'react';
import { Layers, Package } from 'lucide-react';

function InventoryItemCard({ items = [] }) {
  if (!items.length) return (
    <div className="w-full py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200 col-span-full" dir="rtl">
       <p className="text-slate-400 font-bold">لا توجد أصناف أو مخزون متوفر حالياً في هذا الفرع.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" dir="rtl">
      {items.map((item, index) => {
        const currentSizes = item.sizes || item.sizes_details || [];
        const totalQuantity = item.total_group_qty !== undefined 
          ? item.total_group_qty 
          : currentSizes.reduce((sum, s) => sum + (Number(s.quantity) || 0), 0);

        return (
          <div key={index} className="bg-white rounded-[32px] p-8 border border-slate-50 shadow-sm group hover:shadow-md transition-all flex flex-col justify-between">
            
            <div>
              {/* Header Section */}
              <div className="flex justify-between items-start mb-8 gap-4">
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] group-hover:bg-[#050b1a] group-hover:text-white transition-all shrink-0">
                    <Layers size={22} />
                  </div>

                  {/* Title & Info */}
                  <div className="flex flex-col gap-1">
                    <h1 className="bg-slate-100 mb-4 text-[#0f172a] text-[10px] font-black px-2 py-0.5 rounded-lg w-fit">
                       {item.sku || currentSizes[0]?.sku.slice(0,1) || '—'} <span>رقم المنتج</span>
                      </h1>
                    <span className="bg-slate-100 text-[#0f172a] text-[10px] font-black px-2 py-0.5 rounded-lg w-fit">
                      {item.product_name}
                    </span>
                    <h3 className="text-lg font-black text-[#0f172a] leading-tight mt-1">
                      {item.variant_name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-slate-400 font-bold">اللون:</span>
                      <span 
                        className="w-4 h-4 rounded-full border border-slate-200 inline-block" 
                        style={{ backgroundColor: item.color }} 
                        title={item.color}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Total Quantity Badge */}
                <div className="text-left shrink-0">
                  <span className="text-[10px] font-black text-slate-400 block mb-1">إجمالي القطع</span>
                  <span className="text-2xl font-black text-[#0f172a] tabular-nums leading-none">
                    {totalQuantity}
                  </span>
                </div>
              </div>

              {/* Sizes Breakdown Section */}
              <div className="space-y-3 mb-8">
                <p className="text-[10px] font-black text-slate-400 mb-2 border-b border-slate-50 pb-2 flex items-center gap-2">
                  <Package size={12} /> تفاصيل القياسات المتوفرة لـ {item.variant_name}:
                </p>
                
                {currentSizes.length === 0 ? (
                  <p className="text-xs font-bold text-slate-400 py-2">لا توجد مقاسات مسجلة لهذا الموديل.</p>
                ) : (
                  <div className="grid grid-cols-2 gap-3">
                    {currentSizes.map((size, sIdx) => (
                      <div key={sIdx} className="flex justify-between items-center bg-slate-50/50 px-4 py-2.5 rounded-xl border border-slate-50 hover:bg-white hover:border-slate-100 transition-colors">
                        <span className="text-xs font-black text-slate-500">
                          قياس <strong className="text-[#0f172a] font-black">{size.size}</strong>
                        </span>
                        <span className="text-xs font-black text-slate-400 tabular-nums">
                          <strong className="text-[#0f172a] text-sm font-black">{size.quantity}</strong> قطعة
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Footer Section: Costs & Actions */}
            <div className="pt-6 border-t border-dashed border-slate-100 flex justify-between items-center mt-auto">
              <div>
                <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-tight">
                  إجمالي تكلفة الصنف المخزنية
                </span>
                <span className="text-lg font-black text-green-600 tabular-nums">
                  {Number(item.total_group_cost || 0).toLocaleString('en-US')} <small className="text-[10px] mr-0.5">ل.س</small>
                </span>
              </div>

              <div>
                <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-tight">
                  إجمالي مبيع الصنف المخزنية 
                </span>
                <span className="text-lg font-black text-green-600 tabular-nums">
                  {Number(item.total_group_market || item.original_price || 0).toLocaleString('en-US')} <small className="text-[10px] mr-0.5">ل.س</small>
                </span>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default InventoryItemCard;