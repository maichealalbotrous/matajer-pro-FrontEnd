import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit3 } from 'lucide-react'; // استيراد الأيقونات

const DiscountsTable = ({ data, loading, onEdit, onDelete }) => {
  if (loading) return <div className="p-20 text-center font-black text-slate-400 animate-pulse">جاري جلب الخصومات...</div>;

  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="border-b border-slate-100">
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 text-[11px]">المنتج</TableHead>
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 text-[11px]">نوع الخصم</TableHead>
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 text-[11px]">القيمة</TableHead>
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 text-[11px]">الفترة</TableHead>
            <TableHead className="px-8 py-5 text-center font-black text-slate-500 text-[11px]">الحالة</TableHead>
            <TableHead className="px-8 py-5 text-center font-black text-slate-500 text-[11px]">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>

      {/*Table Body */}
        <TableBody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((disc) => (
              <TableRow key={disc.id} className="border-none hover:bg-slate-50/50 transition-colors group">
                <TableCell className="px-8 py-5 font-black text-[#0f172a]">
                  {disc.product?.model_name || `منتج #${disc.product_id}`}
                </TableCell>
                <TableCell className="px-8 py-5">
                  <span className="bg-blue-50 text-[#3198c1] px-3 py-1 rounded-lg text-xs font-black">
                    {disc.discount_type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}
                  </span>
                </TableCell>
                <TableCell className="px-8 py-5 font-black text-[#0f172a]">
                  {disc.discount_value} {disc.discount_type === 'percentage' ? '%' : 'ر.س'}
                </TableCell>
                <TableCell className="px-8 py-5 text-slate-400 font-bold text-xs">
                  {disc.start_date} <span className="mx-1 text-slate-300">←</span> {disc.end_date}
                </TableCell>
                <TableCell className="px-8 py-5 text-center">
                   <div className={`w-2.5 h-2.5 rounded-full mx-auto ${disc.is_active ? 'bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.5)]' : 'bg-slate-300'}`}></div>
                </TableCell>
                
                {/* update and delete button*/}
                <TableCell className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      onClick={() => onEdit(disc)}
                      className="p-2 text-blue-400 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
                      title="تعديل"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(disc.id)}
                      className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="حذف"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow><TableCell colSpan={6} className="py-20 text-center text-slate-300 font-bold">لا توجد خصومات حالية</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default DiscountsTable;