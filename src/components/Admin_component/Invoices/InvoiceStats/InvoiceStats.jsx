import React from 'react';
import { FileText, Clock, CheckCircle2 } from 'lucide-react';

function InvoiceStats({ stats }) {
  const cards = [
    { label: 'إجمالي الفواتير', value: stats.total_count, icon: <FileText size={24} />, color: 'bg-blue-50 text-blue-600' },
    { label: 'قيد الانتظار', value: stats.pending_count, icon: <Clock size={24} />, color: 'bg-amber-50 text-amber-600' },
    { label: 'معتمدة مالياً', value: stats.approved_count, icon: <CheckCircle2 size={24} />, color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10" dir="rtl">
      {cards.map((card, i) => (
        <div key={i} className="bg-white p-6 rounded-[32px] border border-slate-50 shadow-sm flex items-center gap-5">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}>
            {card.icon}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{card.label}</p>
            <p className="text-2xl font-black text-[#0f172a]">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default InvoiceStats;