import React from 'react';
import { Layers, ChevronLeft, Package } from 'lucide-react';

function InventoryItemCard({ items = [] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" dir="rtl">
      {items.map((item, index) => (
        <div key={index} className="bg-white rounded-[32px] p-8 border border-slate-50 shadow-sm group hover:shadow-md transition-all">
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-start gap-4">
              {/* Icon Box */}
              <div className="w-8 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] group-hover:bg-[#050b1a] group-hover:text-white transition-all shrink-0">
                <Layers size={22} />
              </div>

              {/* Title & Info */}
              <div className="flex flex-col gap-1">
                  <span className="bg-slate-100 text-[#0f172a] text-[10px] font-black px-2 py-0.5 rounded-lg whitespace-nowrap">
                    {item.product_name}
                  </span>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg ms-2 font-black text-[#0f172a] leading-tight">
                    {item.variant_name}
                  </h3>
                </div>
                {/* تم تعديل mt-11 لضمان تناسق التصميم مع بقاء الخط العريض */}
                <p className="text-xs text-red-700 font-bold mt-1">
                  {item.color} • اللون
                </p>
              </div>
            </div>
            
            {/* Total Quantity Badge */}
            <div className="text-left">
              <span className="text-[10px] font-black text-slate-400 block mb-1">إجمالي كمية الصنف</span>
              <span className="text-2xl font-black text-[#0f172a] tabular-nums leading-none">
                {item.total_group_qty}
              </span>
            </div>
          </div>

          {/* Sizes Breakdown Section */}
          <div className="space-y-3 mb-8">
            <p className="text-[10px] font-black text-slate-400 mb-2 border-b border-slate-50 pb-2 flex items-center gap-2">
              <Package size={12} /> تفاصيل القياسات المتوفرة لـ {item.variant_name}:
            </p>
            <div className="grid grid-cols-2 gap-3">
              {item.sizes_details.map((size, sIdx) => (
                <div key={sIdx} className="flex justify-between items-center bg-slate-50/50 p-3 rounded-xl border border-slate-50 hover:bg-white hover:border-slate-100 transition-colors">
                  <span className="text-xs font-black text-slate-500 uppercase"><p className=' mb-3'>قياس</p> {size.size}</span>
                  <span className="text-sm font-black text-[#0f172a] tabular-nums"> <p className=' mb-3'>قطعة</p> {size.quantity} </span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Section: Costs & Actions */}
          <div className="pt-6 border-t border-dashed border-slate-100 flex justify-between items-center">
            <div>
              <span className="text-[10px] font-black text-slate-400 block mb-1 uppercase tracking-tight">
                إجمالي تكلفة {item.variant_name}
              </span>
              <span className="text-lg font-black text-green-600 tabular-nums">
                {item.total_group_cost} <small className="text-[10px] mr-0.5">ل.س</small>
              </span>
            </div>
            
            <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 hover:text-[#0f172a] transition-colors group/btn">
              عرض التقارير 
              <ChevronLeft size={14} className="group-hover/btn:-translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}

export default InventoryItemCard;