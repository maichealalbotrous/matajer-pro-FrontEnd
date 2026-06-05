import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2, Receipt, Calendar, CreditCard, DollarSign } from 'lucide-react';

const PaymentsTable = ({ payments = [], onDelete, onEdit }) => {
  // تنسيق التاريخ ليكون موحداً في العرضين
  const formatDate = (dateStr) => {
    if (!dateStr) return 'غير محدد';
    return new Date(dateStr).toLocaleDateString('ar-SA', {
      year: 'numeric', month: '2-digit', day: '2-digit'
    });
  };

  // حالة عدم وجود بيانات (مشاركة بين الجدول والبطاقات)
  const emptyState = (
    <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm p-12 text-center text-slate-400 font-bold text-sm" dir="rtl">
      <div className="flex flex-col items-center justify-center gap-2">
        <Receipt size={32} className="text-slate-300" />
        <span>لا توجد سجلات مدفوعات مطابقة لمعايير البحث الحالية لهذا الفرع.</span>
      </div>
    </div>
  );

  if (payments.length === 0) return emptyState;

  return (
    <div dir="rtl" className="w-full">
      
      {/* 1. عرض بطاقات الجوال (يظهر فقط في الشاشات الصغيرة ويختفي في md فأكبر) */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {payments.map((p) => (
          <div 
            key={p.id} 
            className="bg-white border border-slate-100 rounded-3xl p-5 shadow-sm space-y-4 hover:border-slate-200 transition-all relative overflow-hidden"
          >
            {/* الهيدر العلوي للبطاقة: المعرف والرقم المرجعي */}
            <div className="flex justify-between items-center border-b border-slate-50 pb-3">
              <span className="font-bold text-slate-400 text-xs">#{p.id}</span>
              <div>
                {p.reference_number ? (
                  <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-700">
                    {p.reference_number}
                  </span>
                ) : (
                  <span className="text-slate-300 italic text-[11px] font-normal">بدون إيصال مرجعي</span>
                )}
              </div>
            </div>

            {/* محتوى وتفاصيل المالية */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <DollarSign size={10} /> المبلغ المحصل
                </span>
                <span className="text-[#3198c1] font-black text-sm block">
                  {Number(p.amount_paid).toLocaleString(undefined, { minimumFractionDigits: 2 })} 
                  <span className="text-[10px] text-slate-500 font-bold mr-1">{p.currency || 'SAR'}</span>
                </span>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <CreditCard size={10} /> طريقة الدفع
                </span>
                <span className="text-slate-600 font-bold text-xs block mt-0.5">
                  <span className="border border-slate-200 px-2 py-0.5 rounded-md bg-slate-50">{p.payment_method}</span>
                </span>
              </div>

              <div className="space-y-1 col-span-2 pt-1">
                <span className="block text-[10px] font-bold text-slate-400 flex items-center gap-1">
                  <Calendar size={10} /> تاريخ القيد
                </span>
                <span className="text-slate-500 font-bold text-xs block">
                  {formatDate(p.created_at)}
                </span>
              </div>
            </div>

            {/* أزرار التحكم والعمليات أسفل البطاقة */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-50">
              <button 
                onClick={() => onEdit(p)} 
                className="flex items-center gap-1 px-3 py-1.5 text-blue-500 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors font-bold text-xs"
                title="تعديل السجل"
              >
                <Edit2 size={12}/>
                <span>تعديل</span>
              </button>
              <button 
                onClick={() => onDelete(p.id)} 
                className="flex items-center gap-1 px-3 py-1.5 text-red-500 bg-red-50/50 hover:bg-red-50 rounded-xl transition-colors font-bold text-xs"
                title="حذف السجل"
              >
                <Trash2 size={12}/>
                <span>حذف</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 2. عرض الجدول لسطح المكتب والمقاسات الكبيرة (يختفي في الجوال ويظهر من md فأكبر) */}
      <div className="hidden md:block bg-white rounded-[30px] border border-slate-100 shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50/70">
            <TableRow>
              <TableHead className="font-black text-right text-slate-700 w-[80px]">ID</TableHead>
              <TableHead className="font-black text-right text-slate-700">رقم المرجع / الإيصال</TableHead>
              <TableHead className="font-black text-right text-slate-700">المبلغ المحصل</TableHead>
              <TableHead className="font-black text-right text-slate-700">العملة</TableHead>
              <TableHead className="font-black text-right text-slate-700">طريقة الدفع</TableHead>
              <TableHead className="font-black text-right text-slate-700">تاريخ القيد</TableHead>
              <TableHead className="font-black text-center text-slate-700">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.map((p) => (
              <TableRow key={p.id} className="hover:bg-slate-50/40 transition-colors">
                <TableCell className="font-bold text-slate-400 text-xs">#{p.id}</TableCell>
                <TableCell className="font-bold text-[#0f172a]">
                  {p.reference_number ? (
                    <span className="bg-slate-100 px-2.5 py-1 rounded-lg text-xs font-mono text-slate-700">{p.reference_number}</span>
                  ) : (
                    <span className="text-slate-300 italic text-xs font-normal">بدون إيصال مرجعي</span>
                  )}
                </TableCell>
                <TableCell className="text-[#3198c1] font-black text-sm">
                  {Number(p.amount_paid).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="font-bold text-slate-600 text-xs">{p.currency || 'SAR'}</TableCell>
                <TableCell className="text-slate-600 font-bold text-xs">
                  <span className="border border-slate-200 px-2 py-0.5 rounded-md bg-slate-50">{p.payment_method}</span>
                </TableCell>
                <TableCell className="text-slate-400 font-bold text-xs">
                  {formatDate(p.created_at)}
                </TableCell>
                <TableCell className="flex justify-center items-center gap-1">
                  <button 
                    onClick={() => onEdit(p)} 
                    className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                    title="تعديل السجل"
                  >
                    <Edit2 size={14}/>
                  </button>
                  <button 
                    onClick={() => onDelete(p.id)} 
                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                    title="حذف السجل"
                  >
                    <Trash2 size={14}/>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default PaymentsTable;