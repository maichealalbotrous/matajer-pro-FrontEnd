import React from 'react';
import { Trash2 } from 'lucide-react';

const InvoiceItem = ({ item, index, onRemove }) => (
  <div className="bg-white border border-slate-100 p-6 rounded-[28px] flex justify-between items-center shadow-sm group hover:border-[#3198c1] transition-all">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-[#3198c1]">
        {index + 1}
      </div>
      <div>
        <h3 className="font-black text-[#0f172a]">{item.model_name || `موديل #${item.variant_id}`}</h3>
        <p className="text-slate-400 font-bold text-xs">
          {item.quantity} قطعة × {item.sold_at_price} ل.س
        </p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <span className="font-black text-lg text-[#0f172a]">{item.quantity * item.sold_at_price} ل.س</span>
      <button 
        onClick={() => onRemove(index)}
        className="text-slate-300 hover:text-red-500 transition-colors"
      >
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

export default InvoiceItem;