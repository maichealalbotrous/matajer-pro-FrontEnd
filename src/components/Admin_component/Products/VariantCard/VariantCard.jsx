import React from 'react';
import { Package, Trash2 } from 'lucide-react';

const VariantCard = ({ group, onEdit, onDelete }) => (
  <div className="bg-white border border-slate-100 rounded-[30px] p-5 shadow-sm hover:shadow-md transition-all">
    <div className="flex gap-4 mb-4">
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
        {group.images?.[0] ? (
          <img src={group.images[0]} alt={group.variant_name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300"><Package size={30}/></div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-black text-[#0f172a] text-lg">{group.variant_name}</h4>
          <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black text-slate-500">{group.sku}</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-3 h-3 rounded-full border border-slate-200" style={{ backgroundColor: group.color }}></div>
          <span className="text-sm font-bold text-slate-500">{group.color}</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2 mb-4">
      {group.sizes.map((s, idx) => (
        <div key={idx} className="flex justify-between items-center bg-slate-50 p-2 rounded-xl border border-slate-100">
          <span className="text-xs font-black text-slate-400 uppercase">{s.size}</span>
          <span className="text-xs font-black text-[#0f172a]">{s.quantity} قطعة</span>
        </div>
      ))}
    </div>
    <div className="pt-4 border-t border-dashed flex justify-between items-center">
      <div>
        <p className="text-[10px] font-bold text-slate-400">سعر البيع</p>
        <p className="font-black text-green-600">{group.selling_price} ل.س</p>
      </div>
      <div className="flex gap-2">
        <button onClick={onEdit} className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl font-bold">تعديل</button>
        <button onClick={onDelete} className="p-2 text-red-500 hover:bg-red-50 rounded-xl"><Trash2 size={18}/></button>
      </div>
    </div>
  </div>
);

export default VariantCard;