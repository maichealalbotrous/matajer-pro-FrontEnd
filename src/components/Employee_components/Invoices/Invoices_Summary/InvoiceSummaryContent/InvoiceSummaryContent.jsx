import React from 'react';
import { CreditCard, ArrowLeftRight } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';

// Shared form content used by both the desktop card and the mobile bottom sheet.
// Pure presentation — no state of its own besides what's passed in.
const InvoiceSummaryContent = ({
  invoiceType,
  setInvoiceType,
  originalInvoiceId,
  setOriginalInvoiceId,
  notes,
  setNotes,
  totalAmount,
  onSubmit,
  disabled,
  isExchangeMode,
  exchangeDetails
}) => {

  const types = [
    { id: 'sale', label: 'بيع مباشرة', icon: CreditCard },
    { id: 'exchange', label: 'تبديل مقاصي', icon: ArrowLeftRight },
  ];

  return (
    <>
      {/* Selector */}
      <div className="flex gap-2 mb-8 bg-white/5 p-2 rounded-2xl" dir="rtl">
        {types.map((type) => (
          <button 
            key={type.id}
            type="button"
            onClick={() => !disabled && setInvoiceType(type.id)}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black transition-all ${invoiceType === type.id ? 'bg-[#3198c1] text-white shadow-lg' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <type.icon size={14} className="mx-auto mb-1" /> {type.label}
          </button>
        ))}
      </div>

      {(invoiceType === 'return' || invoiceType === 'exchange') && (
        <div className="mb-6 animate-in fade-in slide-in-from-top-2 text-right">
          <label className="text-[10px] font-black text-slate-400 mr-2 mb-2 block">رقم الفاتورة الأصلية</label>
          <input 
            type="text" 
            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] text-right text-white"
            value={originalInvoiceId}
            onChange={(e) => setOriginalInvoiceId(e.target.value)}
            placeholder="مثال: 1024"
          />
        </div>
      )}
{
    !isExchangeMode&&!exchangeDetails&&(
<div className="mb-8 text-right">
        <label className="text-[10px] font-black text-slate-400 mr-2 mb-2 block">ملاحظات عامة</label>
        <textarea 
          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] min-h-[80px] text-right text-white"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="اكتب أي ملاحظات إضافية هنا..."
        />
      </div>)
}

      {/*exchangeDetails */}
      {isExchangeMode && exchangeDetails && (
        <div className="bg-white/5 rounded-2xl p-4 mb-6 space-y-3 text-xs font-bold border border-white/5 animate-in fade-in">
          <div className="flex justify-between text-emerald-400">
            <span>إجمالي الموديلات البديلة (+):</span>
            <span>{exchangeDetails.totalNew?.toLocaleString()} ل.س</span>
          </div>
          <div className="flex justify-between text-red-400">
            <span>إجمالي الموديلات المسترجعة (-):</span>
            <span>{exchangeDetails.totalReturned?.toLocaleString()} ل.س</span>
          </div>
        </div>
      )}

      <div className="border-t border-white/10 pt-6 mb-8">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 font-bold">
            {invoiceType === 'exchange' ? 'صافي التسوية (المطالب به)' : 'المبلغ الإجمالي'}
          </span>
          <div className="text-left">
            <span className={`text-4xl font-black ${totalAmount >= 0 ? 'text-white' : 'text-amber-400'}`}>
              {totalAmount?.toLocaleString()}
            </span>
            <span className="text-xs font-black text-[#3198c1] mr-1">ل.س</span>
          </div>
        </div>
        {invoiceType === 'exchange' && (
          <p className="text-[10px] text-slate-400 mt-2 text-left font-medium">
            *{totalAmount > 0 ? "يدفع الزبون الفارق للصندوق" : totalAmount < 0 ? "يتم إرجاع الفارق نقداً للزبون" : "مقاصة متعادلة تماماً"}
          </p>
        )}
      </div>

      <MyButton
        title={disabled ? "جاري الحفظ والتدقيق..." : "تأكيد وإرسال الفاتورة"} 
        onClick={onSubmit}
        disabled={disabled}
        className="w-full py-5 bg-white text-[#050b1a] hover:bg-slate-200 shadow-xl disabled:opacity-50 transition-all font-black rounded-2xl"
      />
    </>
  );
};

export default InvoiceSummaryContent;