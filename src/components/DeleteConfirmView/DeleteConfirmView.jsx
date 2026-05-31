import React from 'react';
import { Trash2 } from 'lucide-react';

const DeleteConfirmView = ({ 
  title, 
  description, 
  onConfirm, 
  onCancel, 
  isDeleting, 
  confirmText = "نعم، احذف الكل", 
  processingText = "جاري الحذف...", 
  variant = "danger", 
  icon: Icon = Trash2 
}) => {
  
  const isDanger = variant === "danger";

  return (
    <div className="flex flex-col justify-between h-full animate-in fade-in slide-in-from-bottom-4 flex-1 p-6 bg-[#050b1a] rounded-[32px] max-w-sm mx-auto text-white">
      <div className="space-y-2 text-right" dir="rtl">
        <div className={`flex items-center gap-2 ${isDanger ? 'text-red-500' : 'text-green-400'}`}>
          {Icon && <Icon size={20} />}
          <h4 className="font-black text-lg text-white">{title || "هل أنت متأكد من الحذف؟"}</h4>
        </div>
        <p className="text-slate-400 font-bold text-xs leading-relaxed">
          {description}
        </p>
      </div>

      <div className="flex gap-2 pt-4 border-t border-slate-800 mt-6">
        <button 
          type="button" 
          onClick={onConfirm} 
          disabled={isDeleting} 
          className={`flex-1 py-2.5 text-white rounded-xl font-black text-xs transition-all disabled:opacity-50 active:scale-95 ${
            isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {isDeleting ? processingText : confirmText}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          disabled={isDeleting} 
          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-black text-xs transition-all active:scale-95"
        >
          تراجع
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmView;