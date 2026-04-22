import React from 'react';
import { Trash2, Edit3, FileText, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; 

const ExpenseTable = ({ data, onDelete, onEdit, loading }) => {

  if (loading) return (
    <div className="p-20 text-center font-black text-slate-400 animate-pulse">
      جاري تحميل البيانات...
    </div>
  );


  return (
    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow className="hover:bg-transparent border-b border-slate-100">
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 uppercase text-[11px]">نوع المصروف</TableHead>
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 uppercase text-[11px]">المبلغ</TableHead>
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 uppercase text-[11px]">ملاحظات</TableHead>
            <TableHead className="px-8 py-5 text-right font-black text-slate-500 uppercase text-[11px]">التاريخ</TableHead>
            <TableHead className="px-8 py-5 text-center font-black text-slate-500 uppercase text-[11px]">العمليات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-50">
          {data.length > 0 ? (
            data.map((expense) => (
              <TableRow key={expense.id} className="hover:bg-slate-50/50 transition-colors border-none">
                <TableCell className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-50 text-[#3198c1] rounded-lg flex items-center justify-center">
                      <FileText size={16} />
                    </div>
                    <span className="font-black text-[#0f172a]">{expense.type}</span>
                  </div>
                </TableCell>
                <TableCell className="px-8 py-5 font-black text-[#0f172a]">
                  {expense.amount} <span className="text-[10px] text-slate-400 mr-1">ل.س</span>
                </TableCell>
                <TableCell className="px-8 py-5 text-slate-400 font-bold max-w-xs truncate">
                  {expense.notes || "—"}
                </TableCell>
                <TableCell className="px-8 py-5 text-slate-400 font-bold">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    {new Date(expense.created_at).toLocaleDateString('ar-EG')}
                  </div>
                </TableCell>
                <TableCell className="px-8 py-5">
                 <div className="flex justify-center gap-2">

              <button 
                onClick={() => onEdit(expense)} 
                className="p-2 text-blue-400 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer"
              >
                <Edit3 size={18} />
              </button>

              <button 
                onClick={() => onDelete(expense.id)} 
                className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
              >
      <Trash2 size={18} />
    </button>
  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-40 text-center font-bold text-slate-300">
                لا توجد مصروفات مسجلة
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;