import React from 'react';
import { FileText, Trash2, Eye } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';

function SettlementItemCard({ settlementsData = [], onShow }) {
  if (!settlementsData.length) return (
    <div className="col-span-full py-20 text-center bg-white rounded-[32px] border border-dashed border-slate-200">
       <p className="text-slate-400 font-bold">لا توجد تسويات مالية مسجلة في هذه الفترة.</p>
    </div>
  );

  const renderBranchName = (branch) => {
    if (!branch) return "الفرع الحالي";
    if (typeof branch === 'object') {
      return branch.name || "فرع غير مسمى";
    }
    return branch; 
  };

  const getInvoiceStatusDetails = (invoice, isNegative) => {
    const type = invoice?.type; 

    if (type === 'return') {
      return { text: 'مرتجع مالي', className: 'bg-red-50 text-red-500' };
    }
    
    if (type === 'exchange') {
      if (isNegative) {
        return { text: 'تبديل (دائن)', className: 'bg-indigo-50 text-indigo-600' };
      }
      return { text: 'تبديل (مدين)', className: 'bg-purple-50 text-purple-600' };
    }

    if (invoice?.status === 'approved' || !invoice) {
      return { text: 'معتمدة', className: 'bg-green-50 text-green-500' };
    }
    return { text: 'تحت المراجعة', className: 'bg-amber-50 text-amber-500' };
  };

  const getOperationTypeText = (type) => {
    switch (type) {
      case 'return':
        return 'عملية إرجاع';
      case 'exchange':
        return 'عملية تبديل أصناف';
      case 'sale':
      default:
        return 'عملية بيع نقدي';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {settlementsData.map((item) => {
        const netProfitValue = Number(item.net_profit || item.amount || 0);
        const isNegative = netProfitValue < 0;
        
        const badge = getInvoiceStatusDetails(item.invoice, isNegative);
        
        let profitLabel = 'صافي الربح للقيد';
        if (item.invoice?.type === 'return') {
          profitLabel = 'إجمالي المرتجع للصنف';
        } else if (item.invoice?.type === 'exchange') {
          profitLabel = 'صافي فرق التبديل';
        }

        return (
          <div key={item.id} className="bg-white rounded-[32px] p-6 border border-slate-50 shadow-sm hover:shadow-md transition-all group relative" dir="rtl">
            
            {/* الشارة العلوية */}
            <div className="absolute top-6 left-6">
              <span className={`text-[10px] font-black px-3 py-1 rounded-full ${badge.className}`}>
                {badge.text}
              </span>
            </div>

            {/* معلومات المرجع ونوع العملية الحالية */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-[#0f172a] group-hover:text-white transition-all">
                <FileText size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-black text-[#0f172a]">SET-{item.id}</h3>
                  {/* 💡 طباعة نوع العملية الحالي بشكل صريح بجانب المعرّف الرئيسي */}
                  <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                    {getOperationTypeText(item.invoice?.type)}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold mt-1">
                  {item.settlement_date ? new Date(item.settlement_date).toLocaleDateString('ar-EG') : '—'} - {renderBranchName(item.branch)}
                </p>
              </div>
            </div>

            {/* صافي الربح والعمليات */}
            <div className="flex justify-between items-end pt-4 border-t border-slate-50">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block mb-1">
                  {profitLabel}
                </span>
                <span className={`text-xl font-black tracking-tight tabular-nums ${isNegative ? 'text-red-600' : 'text-[#0f172a]'}`}>
                  {netProfitValue.toLocaleString('en-US')} <small className="text-[10px]">ل.س</small>
                </span>
              </div>
              <div className="flex gap-2">
                <MyButton title={<Eye size={18} />} onClick={() => onShow(item)} className="p-2 text-slate-300 hover:text-[#0f172a] transition-colors"/>
                {/* <MyButton title={<Trash2 size={18} />} onClick={() => onDelete(item.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors"/> */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default SettlementItemCard;