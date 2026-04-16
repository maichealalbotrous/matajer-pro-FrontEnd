import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReceiptText, Calendar, Landmark, Wallet } from 'lucide-react';

function SettlementDetailModal({ isOpen, onClose, data }) {
  if (!data) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[450px] rounded-[40px] border-none p-8 bg-white outline-none" showCloseButton={false}>
        <DialogHeader className="text-right">
          <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-4">
            <ReceiptText size={28} />
          </div>
          <DialogTitle className="text-2xl font-black text-[#0f172a]">تفاصيل العملية</DialogTitle>
          <p className="text-slate-400 font-bold text-xs mt-1">رقم المرجع: #{data.id}</p>
        </DialogHeader>

        <div className="space-y-4 mt-8" dir="rtl">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">الفرع</span>
              <p className="font-black text-[#0f172a] text-sm">{data.branch}</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <span className="text-[10px] font-bold text-slate-400 block mb-1">التاريخ</span>
              <p className="font-black text-[#0f172a] text-sm">{data.date}</p>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-[24px] flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-2">
              <Wallet size={14} /> القيمة الإجمالية
            </span>
            <span className="text-xl font-black text-[#0f172a] tabular-nums">
              {data.amount} <small className="text-[10px]">ل.س</small>
            </span>
          </div>
        </div>

        <button onClick={onClose} className="w-full mt-8 py-4 bg-[#050b1a] text-white rounded-[20px] font-black text-sm shadow-xl hover:bg-black transition-all active:scale-95">
          إغلاق النافذة
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default SettlementDetailModal;