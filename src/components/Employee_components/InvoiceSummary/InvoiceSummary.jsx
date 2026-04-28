import React from 'react';
import { CreditCard, RefreshCw, ArrowLeftRight } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';

const InvoiceSummary = ({ 
  invoiceType, 
  setInvoiceType, 
  originalInvoiceId, 
  setOriginalInvoiceId, 
  notes, 
  setNotes, 
  totalAmount, 
  onSubmit 
}) => {
  return (
    <div className="bg-[#050b1a] rounded-[40px] p-8 shadow-2xl text-white sticky top-8">
      <h2 className="text-xl font-black mb-6">إتمام العملية</h2>
      
      {/* Selector */}
      <div className="flex gap-2 mb-8 bg-white/5 p-2 rounded-2xl">
        {[
          { id: 'sale', label: 'بيع', icon: CreditCard },
          { id: 'return', label: 'مرتجع', icon: RefreshCw },
          { id: 'exchange', label: 'استبدال', icon: ArrowLeftRight },
        ].map((type) => (
          <button 
            key={type.id}
            onClick={() => setInvoiceType(type.id)}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${invoiceType === type.id ? 'bg-[#3198c1] text-white shadow-lg' : 'text-slate-400'}`}
          >
            <type.icon size={14} className="mx-auto mb-1" /> {type.label}
          </button>
        ))}
      </div>

      {invoiceType !== 'sale' && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 text-right">
          <label className="text-[10px] font-black text-slate-400 mr-2 mb-2 block">رقم الفاتورة الأصلية</label>
          <input 
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] text-right"
            value={originalInvoiceId}
            onChange={(e) => setOriginalInvoiceId(e.target.value)}
          />
        </div>
      )}

      <div className="mb-8 text-right">
        <label className="text-[10px] font-black text-slate-400 mr-2 mb-2 block">ملاحظات عامة</label>
        <textarea 
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] min-h-[80px] text-right"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-bold">المبلغ الإجمالي</span>
          <div className="text-left">
            <span className="text-4xl font-black text-white">{totalAmount}</span>
            <span className="text-xs font-black text-[#3198c1] mr-1">ل.س</span>
          </div>
        </div>
      </div>

      <MyButton 
        title="تأكيد وإرسال الفاتورة" 
        onClick={onSubmit}
        className="w-full py-5 bg-white text-[#050b1a] hover:bg-slate-200 shadow-xl"
      />
    </div>
  );
};

export default InvoiceSummary;