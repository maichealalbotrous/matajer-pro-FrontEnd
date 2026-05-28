import React from 'react';
import { Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiscountsStatsCard = ({ averageDiscount = 15 }) => {
  return (
    <Link 
      to={'/Discounts'} 
      className="bg-white rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 w-full min-w-[190px] max-w-full hover:shadow-md transition-all duration-300 box-border block"
    >
      {/* الأيقونة العلوية - محاذاة مرنة */}
      <div className="w-full flex justify-end mb-1 md:mb-3 text-[#3198c1]">
        <div className="bg-blue-50/50 p-2 rounded-xl flex items-center justify-center">
          <Tag size={22} fill="currentColor" className="rotate-90 md:w-[24px] md:h-[24px]" />
        </div>
      </div>

      {/* منطقة النصوص */}
      <div className="w-full space-y-1">
        <h3 className="text-base md:text-xl font-black text-[#0f172a] whitespace-nowrap">
          الخصومات
        </h3>
        
        <div className="text-3xl md:text-4xl font-black text-[#0f172a] py-1 md:py-2">
          {averageDiscount}%
        </div>

        <p className="text-[11px] md:text-[12px] font-bold text-slate-400 leading-relaxed block">
          متوسط الخصم الأسبوعي
        </p>
      </div>
    </Link>
  );
};

export default DiscountsStatsCard;