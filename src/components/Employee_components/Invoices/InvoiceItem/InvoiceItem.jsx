import React from 'react';
import { Trash2, RotateCcw } from 'lucide-react';

const InvoiceItem = ({ item, index, onRemove, isReturnStyle = false }) => (
  <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0 text-right gap-2">
    
    {/* رقم العنصر أو أيقونة المرتجع */}
    <div className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center font-bold text-xs ${isReturnStyle ? 'bg-red-50 text-red-500' : 'bg-slate-100 text-slate-600'}`}>
      {isReturnStyle ? <RotateCcw size={12} /> : index + 1}
    </div>

    {/* تفاصيل المنتج: الاسم، القياس، والكمية */}
    <div className="flex-1 min-w-0 px-2">
      <h3 className="font-black text-slate-800 text-sm truncate">
        {item.variant_name || item.model_name || `موديل #${item.variant_id}`}
      </h3>
      <p className="text-slate-400 font-medium text-xs mt-0.5 flex items-center gap-2 flex-wrap">
        {item.size && <span>{item.size}</span>}
        {item.size && <span>•</span>}
        <span>الكمية: {item.quantity}</span>
        {isReturnStyle && <span className="text-red-500 font-bold">(مسترجع)</span>}
      </p>
    </div>

    {/* السعر وزر الحذف */}
    <div className="flex items-center gap-3 shrink-0">
      <span className={`font-black text-sm sm:text-base whitespace-nowrap ${isReturnStyle ? 'text-red-600' : 'text-slate-900'}`}>
        {isReturnStyle ? '-' : ''}{item.quantity * item.sold_at_price} ل.س
      </span>
      <button 
        onClick={() => onRemove(index)}
        className="text-slate-300 hover:text-red-500 transition-colors p-1"
        title="حذف الصنف"
      >
        <Trash2 size={16} />
      </button>
    </div>

  </div>
);

export default InvoiceItem;