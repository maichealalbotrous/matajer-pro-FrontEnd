import React from 'react';
import { FileText, Clock, CheckCircle2 } from 'lucide-react';

function InvoiceStats({ stats }) {
  const cards = [
    { label: 'إجمالي الفواتير', value: stats?.total_count || 0, icon: <FileText size={24} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'قيد الانتظار', value: stats?.pending_count || 0, icon: <Clock size={24} />, color: 'bg-amber-50 text-amber-600' },
    { label: 'معتمدة مالياً', value: stats?.approved_count || 0, icon: <CheckCircle2 size={24} />, color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 w-full max-w-7xl mx-auto" dir="rtl">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-5 md:p-6 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${card.color}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-xl font-black text-[#0f172a]">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceStats;