import React from 'react';
import { Tag } from 'lucide-react';
import {Link} from 'react-router-dom';
const DiscountsStatsCard = ({ averageDiscount = 15 }) => {
  return (
    <Link to={'/Discounts'} className="bg-white rounded-[32px] p-8 flex flex-col items-center justify-center text-center shadow-sm border border-slate-50 w-full max-w-[280px]">

      <div className="self-end mb-4 text-[#3198c1] bg-blue-50/50 p-2 rounded-xl">
        <Tag size={24} fill="currentColor" className="rotate-90" />
      </div>

      <div className="space-y-1 mt-2">
        <h3 className="text-xl font-black text-[#0f172a]">الخصومات</h3>
        
        <div className="text-4xl font-black text-[#0f172a] py-2">
          {averageDiscount}%
        </div>

        <p className="text-[12px] font-bold text-slate-400">
          متوسط الخصم الأسبوعي
        </p>
      </div>
    </Link>
  );
};

export default DiscountsStatsCard;