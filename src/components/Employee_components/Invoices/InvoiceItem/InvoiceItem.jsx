import React from 'react';
import { Trash2, RotateCcw } from 'lucide-react';

const InvoiceItem = ({ item, index, onRemove, isReturnStyle = false }) => (
  <div className="flex justify-between items-center py-4 border-b border-slate-100 last:border-b-0 transition-all">
    <div className="flex items-center gap-4 text-right">
      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isReturnStyle ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-600'}`}>
        {isReturnStyle ? <RotateCcw size={14} /> : index + 1}
      </span>
      <div>
        <h3 className="font-black text-slate-800 text-base">
          {item.variant_name || item.model_name || `موديل #${item.variant_id}`}
        </h3>
        <p className="text-slate-400 font-medium text-xs mt-0.5">
          {item.size ? `قاس ${item.size}` : ''} {item.size && item.color ? '•' : ''} {item.color ? `لون ${item.color}` : ''} • الكمية: {item.quantity}
          {isReturnStyle && <span className="text-red-500 mr-1 font-bold">(مسترجع)</span>}
        </p>
      </div>
    </div>
    
    <div className="flex items-center gap-4">
      <span className={`font-black text-base ${isReturnStyle ? 'text-red-600' : 'text-slate-900'}`}>
        {isReturnStyle ? '-' : ''}{item.quantity * item.sold_at_price} ل.س
      </span>
      <button 
        onClick={() => onRemove(index)}
        className="text-slate-300 hover:text-red-500 transition-colors p-1"
        title="حذف الصنف"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default InvoiceItem;