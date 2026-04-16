import React from 'react';
import { TrendingUp, ArrowDownCircle, Wallet, BarChart3 } from 'lucide-react';
{/* the main statistics section */}
function SettlementStats({ statistics }) {
  const stats = [
    { 
      label: "صافي الأرباح الحقيقي", 
      value: statistics?.total_net_profit, 
      icon: <TrendingUp size={24} />, 
      color: "text-blue-600", 
      bg: "bg-blue-50",
      desc: "بعد خصم المصاريف" 
    },
    { 
      label: "إجمالي المصاريف", 
      value: statistics?.total_expenses, 
      icon: <ArrowDownCircle size={24} />, 
      color: "text-red-600", 
      bg: "bg-red-50",
      desc: "مصاريف الفرع الحالية" 
    },
    { 
      label: "أرباح المبيعات", 
      value: statistics?.total_gross_revenue, 
      icon: <Wallet size={24} />, 
      color: "text-green-600", 
      bg: "bg-green-50",
      desc: "إيرادات المبيعات فقط" 
    },
    { 
      label: "عمليات التسوية", 
      value: statistics?.settlements_count, 
      icon: <BarChart3 size={24} />, 
      color: "text-slate-700", 
      bg: "bg-slate-50",
      desc: "إجمالي الحركات" 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, idx) => (
        <div key={idx} className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <div className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider">{item.desc}</span>
          </div>
          <div>
            <p className="text-slate-400 font-bold text-[10px] mb-1">{item.label}</p>
            <h3 className={`text-2xl font-black tabular-nums ${item.value < 0 ? 'text-red-500' : 'text-[#0f172a]'}`}>
              {item.value || 0} <span className="text-xs text-slate-400">ل.س</span>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SettlementStats;