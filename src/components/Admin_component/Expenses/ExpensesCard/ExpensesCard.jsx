import React from 'react';
import { Link } from 'react-router-dom'; 
const ExpensesCard = ({ amount }) => {

    const formatAmount = (num) => {
     if(num === 0) return "0";
    return num.toLocaleString('en-US');
  };

  return (
    <Link to="/Expenses" 
      className="bg-[#0f172a] rounded-[32px] p-10 flex justify-between items-start text-right w-full max-w-2xl mx-auto shadow-2xl shadow-black/10"
      dir="rtl" 
    >
      
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-black text-white leading-tight tracking-tight">
          المصاريف
        </h3>
        <p className="text-[12px] font-bold text-slate-400 leading-relaxed max-w-[280px]">
          تحليل دقيق للمصروفات الثابتة والمتغيرة لكل الفروع.
        </p>
      </div>

      <div className="flex flex-col items-end gap-1.5 pt-1">
        <span className="text-[11px] font-bold text-slate-500">
          هذا الشهر
        </span>
        
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-black text-white tabular-nums tracking-tighter">
            {formatAmount(amount)}
          </span>
          <span className="text-[10px] font-black text-slate-500 mr-1.5 mt-auto">
            ل.س
          </span>
        </div>
      </div>

    </Link>
  );
};

export default ExpensesCard;