import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReceiptText, Wallet, User, Layers } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import { getSettlementDetailsFromServer } from '../SettlementsManager/lib';

function SettlementDetailModal({ isOpen, onClose, settlementId }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!settlementId) return;
    
    const loadDetails = async () => {
      try {
        setLoading(true);
        const res = await getSettlementDetailsFromServer(settlementId);
        if (res.success) {
          setDetail(res.data);
        }
      } catch (err) {
        console.error("فشل تحميل تفاصيل القيد المالي البنية:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDetails();
  }, [settlementId]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[480px] rounded-[40px] border-none p-8 bg-white outline-none overflow-y-auto max-h-[85vh]" showCloseButton={false}>
        
        {loading ? (
          <div className="p-10 text-center font-bold text-slate-400 animate-pulse">جاري فك تشفير البيانات المالية...</div>
        ) : detail ? (
          <>
            <DialogHeader className="text-right">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-4">
                <ReceiptText size={28} />
              </div>
              <DialogTitle className="text-2xl font-black text-[#0f172a]">تفاصيل قيد التسوية</DialogTitle>
              <p className="text-slate-400 font-bold text-xs mt-1">رقم المرجع المصرفي: #SET-{detail.id}</p>
            </DialogHeader>

            <div className="space-y-4 mt-6" dir="rtl">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-[22px]">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">المعتمد</span>
                  <p className="font-black text-[#0f172a] text-xs flex items-center gap-1">
                    <User size={12}/> {detail.approver?.name || "النظام التلقائي"}
                  </p>
                </div>
                <div className="bg-slate-50 p-4 rounded-[22px]">
                  <span className="text-[10px] font-bold text-slate-400 block mb-1">التاريخ</span>
                  <p className="font-black text-[#0f172a] text-xs">
                    {new Date(detail.settlement_date).toLocaleDateString('ar-EG')}
                  </p>
                </div>
              </div>

              {/* تفاصيل الفاتورة والعناصر المبيوعة */}
              {detail.invoice?.invoice_items && (
                <div className="bg-slate-50/50 p-4 rounded-[24px] border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1 mb-2">
                    <Layers size={12}/> العناصر المشمولة بالفاتورة
                  </span>
                  <div className="space-y-2 max-h-32 overflow-y-auto pl-1">
                  {detail.invoice?.invoice_items?.map((item, idx) => (
              <div key={idx} className="flex justify-between text-xs font-bold text-[#0f172a]">
                <span>{item.variant?.variant_name || "منتج افتراضي"} × {item.quantity}</span>
                <span className="tabular-nums">
                  {Number(item.variant.selling_price).toLocaleString('en-US')} ل.س
                </span>
              </div>
            ))}
                  </div>
                </div>
              )}

              {/* الإجماليات المالية الفردية */}
              <div className="bg-slate-50 p-5 rounded-[24px] space-y-3">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-500">سعر المبيع </span>
                  <span className="text-[#0f172a]">{Number(detail.gross_profit).toLocaleString()} ر.س</span>
                </div>
                <div className="w-full h-[1px] bg-slate-200/60"></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Wallet size={14} /> صافي الربح الفعلي
                  </span>
                  <span className="text-xl font-black text-green-600 tabular-nums">
                    {Number(detail.net_profit).toLocaleString()} <small className="text-[10px]">ر.س</small>
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-red-500 font-bold">تعذر جلب تفاصيل هذه العملية.</div>
        )}

        <MyButton title={'إغلاق النافذة'} onClick={onClose} className="w-full mt-6 py-4 bg-[#050b1a] text-white rounded-[20px] font-black text-sm shadow-xl hover:bg-black transition-all" />
        
      </DialogContent>
    </Dialog>
  );
}

export default SettlementDetailModal;