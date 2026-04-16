import React from 'react';
import { FileText, Trash2, Eye } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';

function SettlementItemCard({ settlementsData = [], onShow, onDelete }) {
  if (!settlementsData.length) return (
    <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
       <p className="text-slate-400 font-bold">لا توجد بيانات متاحة في هذه الفترة.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {settlementsData.map((item) => (
        <div key={item.id} className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-md transition-all group relative" dir="rtl">
          {/* the invoice settlements status badge */}
          <div className="absolute top-6 left-6">
            <span className={`text-[10px] font-black px-3 py-1 rounded-full ${item.status === 'completed' ? 'bg-green-50 text-green-500' : 'bg-amber-50 text-amber-500'}`}>
              {item.status === 'completed' ? 'معتمدة' : 'تحت المراجعة'}
            </span>
          </div>

{/* the settlement basic info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#0f172a] group-hover:text-white transition-all">
              <FileText size={22} />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0f172a]">INV-{item.id}</h3>
              <p className="text-[10px] text-slate-400 font-bold">{item.time || item.date} - {item.branch}</p>
            </div>
          </div>

          {/* the settlement amount and actions */}
          <div className="flex justify-between items-end pt-4 border-t border-slate-50">
            <div>
              <span className="text-[10px] text-slate-400 font-bold block mb-1">المبلغ</span>
              <span className="text-xl font-black text-[#0f172a] tracking-tight tabular-nums">{item.amount} ل.س</span>
            </div>
            <div className="flex gap-2">
              <MyButton title={<Eye size={18} />} onClick={() => onShow(item)} className="p-2 text-slate-300 hover:text-[#0f172a] transition-colors"/>
              <MyButton title={<Trash2 size={18} />} onClick={() => onDelete(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"/>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SettlementItemCard;