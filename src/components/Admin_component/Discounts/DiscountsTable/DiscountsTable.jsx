import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, Edit3, Calendar } from 'lucide-react';

const DiscountsTable = ({ data, loading, onEdit, onDelete }) => {
  if (loading) return <div className="p-20 text-center font-black text-slate-400 animate-pulse">جاري جلب الخصومات...</div>;

  return (
    <div className="w-full" dir="rtl">
      {/* 1. عرض الجدول (Desktop) */}
      <div className="hidden md:block bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
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
          <TableBody className="divide-y divide-slate-50">
            {data.length > 0 ? data.map((disc) => (
              <TableRow key={disc.id} className="border-none hover:bg-slate-50/50 transition-colors">
                <TableCell className="px-8 py-5 font-black text-[#0f172a]">{disc.product?.model_name || `منتج #${disc.product_id}`}</TableCell>
                <TableCell className="px-8 py-5">
                  <span className="bg-blue-50 text-[#3198c1] px-3 py-1 rounded-lg text-xs font-black">{disc.discount_type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}</span>
                </TableCell>
                <TableCell className="px-8 py-5 font-black text-[#0f172a]">{disc.discount_value} {disc.discount_type === 'percentage' ? '%' : 'ر.س'}</TableCell>
                <TableCell className="px-8 py-5 text-slate-400 font-bold text-xs">{disc.start_date} ← {disc.end_date}</TableCell>
                <TableCell className="px-8 py-5 text-center">
                  <div className={`w-2.5 h-2.5 rounded-full mx-auto ${disc.is_active ? 'bg-green-400' : 'bg-slate-300'}`}></div>
                </TableCell>
                <TableCell className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => onEdit(disc)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-xl"><Edit3 size={18} /></button>
                    <button onClick={() => onDelete(disc.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
                  </div>
                </TableCell>
              </TableRow>
            )) : <TableRow><TableCell colSpan={6} className="py-20 text-center text-slate-300 font-bold">لا توجد خصومات حالية</TableCell></TableRow>}
          </TableBody>
        </Table>
      </div>

      {/* 2. عرض البطاقات (Mobile) */}
      <div className="md:hidden space-y-4">
        {data.length > 0 ? data.map((disc) => (
          <div key={disc.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center font-black text-[#0f172a]">
              <span>{disc.product?.model_name || `منتج #${disc.product_id}`}</span>
              <div className={`w-2.5 h-2.5 rounded-full ${disc.is_active ? 'bg-green-400' : 'bg-slate-300'}`}></div>
            </div>
            <div className="flex justify-between text-xs font-black">
              <span className="bg-blue-50 text-[#3198c1] px-3 py-1 rounded-lg">{disc.discount_type === 'percentage' ? 'نسبة مئوية' : 'مبلغ ثابت'}</span>
              <span>{disc.discount_value} {disc.discount_type === 'percentage' ? '%' : 'ر.س'}</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar size={12} /> {disc.start_date}</span>
              <div className="flex gap-2">
                <button onClick={() => onEdit(disc)} className="p-2 text-blue-400 hover:bg-blue-50 rounded-xl"><Edit3 size={18} /></button>
                <button onClick={() => onDelete(disc.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        )) : <div className="p-10 text-center text-slate-400 font-bold">لا توجد خصومات حالية</div>}
      </div>
    </div>
  );
};

export default DiscountsTable;