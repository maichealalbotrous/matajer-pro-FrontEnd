import React from 'react';
import { Trash2, RotateCcw, ArrowLeftRight } from 'lucide-react';

const InvoiceItem = ({ item, index, onRemove, isReturnStyle = false }) => (
  <div className={`bg-white border p-6 rounded-[28px] flex justify-between items-center shadow-sm group transition-all
    ${isReturnStyle 
      ? 'border-red-100 hover:border-red-400 bg-red-50/10' 
      : 'border-slate-100 hover:border-[#3198c1]'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black 
        ${isReturnStyle ? 'bg-red-50 text-red-500' : 'bg-slate-50 text-[#3198c1]'}`}>
        {isReturnStyle ? <RotateCcw size={16} /> : index + 1}
      </div>
      <div>
        <h3 className="font-black text-[#0f172a]">{item.variant_name || item.model_name || `موديل #${item.variant_id}`}</h3>
        <p className="text-slate-400 font-bold text-xs">
          {item.quantity} قطعة × {item.sold_at_price} ل.س 
          {isReturnStyle && <span className="text-red-500 mr-1">(مسترجع)</span>}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-6">
      <span className={`font-black text-lg ${isReturnStyle ? 'text-red-600' : 'text-[#0f172a]'}`}>
        {isReturnStyle ? '-' : ''}{item.quantity * item.sold_at_price} ل.س
      </span>
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