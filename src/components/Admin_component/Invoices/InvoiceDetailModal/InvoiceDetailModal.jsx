import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Receipt, Package, User, Phone, CheckCircle, RotateCcw, ArrowLeftRight } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';

function InvoiceDetailModal({ isOpen, onClose, invoice }) {
  if (!invoice) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-[500px] rounded-[40px] border-none p-8 bg-white outline-none overflow-hidden" 
        showCloseButton={false}
      >
        {/* Header Section */}
        <DialogHeader className="text-right flex flex-col items-center sm:items-start">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-4">
            <Receipt size={28} />
          </div>
          <DialogTitle className="text-2xl font-black text-[#0f172a]">
            تفاصيل الفاتورة #{invoice.id}
          </DialogTitle>
          <p className="text-slate-400 font-bold text-xs mt-1">
            {invoice.notes || "لا توجد ملاحظات إضافية لهذه العملية"}
          </p>
        </DialogHeader>

        <div className="space-y-6 mt-8" dir="rtl">
          {/* Employee & Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">الموظف المسؤول</span>
              <p className="font-black text-[#505359] text-sm flex items-center gap-2">
                <User size={14} className="text-slate-400" /> {invoice.user?.name}
              </p>

               <p className=' font-black text-[#505359] text-sm flex items-center gap-2'>
                  <Phone size={14} className="text-slate-400" /> {invoice.user?.phone}
               </p>

            </div>
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">نوع العملية</span>
              <div className="font-black text-sm">
                {invoice.type === 'sale' ? (
                  <span className="text-green-600 flex items-center gap-1">بيع <CheckCircle size={14} /></span>
                ) : invoice.type === 'return' ? (
                  <span className="text-red-600 flex items-center gap-1">إرجاع <RotateCcw size={14} /></span>
                ) : (
                  <span className="text-blue-600 flex items-center gap-1">تبديل <ArrowLeftRight size={14} /></span>
                )}
              </div>
            </div>
          </div>

          {/* Items Section */}
          <div className="space-y-3">
            <p className="text-[10px] font-black text-slate-400 border-b pb-2 flex items-center gap-2">
              <Package size={14} /> المنتجات المباعة
            </p>
            <div className="max-h-[200px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {invoice.invoice_items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-[10px] font-black">
                      {item.quantity}x
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-[#0f172a]">{item.variant?.variant_name}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{item.variant?.color} • {item.variant?.size}</p>
                    </div>
                  </div>
                  <p className="font-black text-xs text-[#0f172a] tabular-nums">
                    {parseFloat(item.sold_at_price).toLocaleString()} <small className="text-[8px]">ل.س</small>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Total Amount Footer */}
          <div className="bg-[#0f172a] p-6 rounded-[28px] flex justify-between items-center shadow-xl shadow-slate-200">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-2">
              القيمة الإجمالية للفاتورة
            </span>
            <span className="text-2xl font-black text-white tabular-nums">
              {parseFloat(invoice.total_amount).toLocaleString()} <small className="text-xs text-slate-400">ل.س</small>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <MyButton 
          title="إغلاق التفاصيل" 
          onClick={onClose} 
          className="w-full mt-8 py-4 bg-[#050b1a] text-white rounded-[20px] font-black text-sm shadow-xl hover:bg-black transition-all active:scale-95"
        />
      </DialogContent>
    </Dialog>
  );
}

export default InvoiceDetailModal;