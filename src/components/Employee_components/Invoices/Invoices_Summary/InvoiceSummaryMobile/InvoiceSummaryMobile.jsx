import React, { useState, useEffect } from 'react';
import { ChevronUp, X, ReceiptText } from 'lucide-react';
import InvoiceSummaryContent from '../InvoiceSummaryContent/InvoiceSummaryContent';

// Mobile variant: a fixed bottom bar (always visible, no scrolling required)
// that opens a bottom sheet with the full invoice summary on tap.
const InvoiceSummaryMobile = (props) => {
  const { invoiceType, totalAmount, disabled, onSubmit } = props;

  // UI-only state: controls the sheet visibility. No business logic here.
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Lock body scroll while the sheet is open, and allow closing it with Escape.
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = 'hidden';
      const onKeyDown = (e) => e.key === 'Escape' && setIsSheetOpen(false);
      window.addEventListener('keydown', onKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', onKeyDown);
      };
    }
  }, [isSheetOpen]);

  const handleSubmit = () => {
    onSubmit();
    setIsSheetOpen(false);
  };

  return (
    <div className="lg:hidden">
      {/* Spacer reserving space in normal flow so the fixed bar never overlaps the last cart item */}
      <div className="h-24" aria-hidden="true" />

      {/* Fixed bottom bar */}
      <button
        type="button"
        onClick={() => setIsSheetOpen(true)}
        disabled={disabled}
        className="fixed bottom-0 inset-x-0 z-40 bg-[#050b1a] border-t border-white/10 px-5 py-4 flex items-center justify-between gap-3 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] disabled:opacity-60"
        dir="rtl"
      >
        <span className="flex items-center gap-2 bg-white text-[#050b1a] font-black text-xs px-4 py-3 rounded-2xl shrink-0">
          <ReceiptText size={14} />
          {disabled ? "جاري الحفظ..." : "عرض الفاتورة"}
          <ChevronUp size={14} />
        </span>

        <span className="text-right leading-tight">
          <span className="block text-[10px] font-black text-slate-400">
            {invoiceType === 'exchange' ? 'صافي التسوية' : 'المبلغ الإجمالي'}
          </span>
          <span className="flex items-baseline gap-1 justify-end">
            <span className={`text-2xl font-black ${totalAmount >= 0 ? 'text-white' : 'text-amber-400'}`}>
              {totalAmount?.toLocaleString()}
            </span>
            <span className="text-[10px] font-black text-[#3198c1]">ل.س</span>
          </span>
        </span>
      </button>

      {/* Backdrop */}
      {isSheetOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-in fade-in"
          onClick={() => setIsSheetOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Bottom sheet */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 bg-[#050b1a] text-white rounded-t-[32px] shadow-2xl text-right transition-transform duration-300 ease-out max-h-[88vh] flex flex-col ${isSheetOpen ? 'translate-y-0' : 'translate-y-full pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-label="إتمام العملية"
      >
        {/* Grab handle */}
        <div className="flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-10 h-1.5 bg-white/15 rounded-full" />
        </div>

        <div className="flex items-center justify-between px-6 pt-2 pb-4 shrink-0" dir="rtl">
          <button
            type="button"
            onClick={() => setIsSheetOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="إغلاق"
          >
            <X size={16} />
          </button>
          <h2 className="text-xl font-black">إتمام العملية</h2>
        </div>

        <div className="px-6 pb-8 overflow-y-auto">
          <InvoiceSummaryContent {...props} onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceSummaryMobile;