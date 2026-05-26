import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Layers } from 'lucide-react';

function ProductsStateCard({ ProductsData }) {
  if (!ProductsData) {
    return (
      <div className="block bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 min-h-[160px] animate-pulse">
        <div className="h-4 bg-slate-100 rounded w-1/2 mb-4"></div>
        <div className="h-8 bg-slate-100 rounded w-1/3 mt-auto align-bottom"></div>
      </div>
    );
  };
  
  const displaySubtitle = ProductsData.variants_groups 
    ? `${ProductsData.variants_groups.length} موديلات مسجلة` 
    :  "حالة المخزن الحالية";

  const displayCount = ProductsData.variants_groups?.length || 0


  return (
    <Link to="/products" className="block bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 hover:shadow-md transition-all h-full flex flex-col justify-between" dir="rtl">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col">
          <h3 className="text-lg font-black text-[#0f172a]">المنتجات</h3>
          <span className="text-[10px] font-black mt-1 text-slate-400">
            {displaySubtitle}
          </span>
        </div>
        <div className="p-2 bg-slate-50 rounded-xl text-slate-400">
          <Layers size={20} />
        </div>
      </div>
      <div className="flex flex-col items-end mt-auto">
        <span className="text-4xl font-black text-[#0f172a] tracking-tighter">{displayCount}</span>
        <span className="text-[10px] font-bold text-slate-400 mt-1">إجمالي الموديلات المتوفرة</span>
      </div>
    </Link>
  );
}

export default ProductsStateCard;