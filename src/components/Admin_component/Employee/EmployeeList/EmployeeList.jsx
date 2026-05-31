import React from 'react';
import { Trash2, Edit3, ShieldCheck, User } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function EmployeeList({ employees = [], onEdit, onDelete }) {
  const employeesArray = Array.isArray(employees) ? employees : Object.values(employees);

  const formatDate = (dateString) => {
    if (!dateString) return "تاريخ غير متوفر";
    try {
      return new Date(dateString).toLocaleDateString('ar-EG', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full" dir="rtl">
      {/* 1. نسخة الحاسوب (Desktop) */}
      <div className="hidden md:block bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <Table className="w-full border-collapse">
          <TableHeader className="bg-slate-50/50 border-none">
            <TableRow className="border-none">
              {/* إضافة text-right لضمان ثبات العناوين مع البيانات الفوقية */}
              <TableHead className="p-6 text-right font-black text-slate-700">الموظف</TableHead>
              <TableHead className="p-6 text-right font-black text-slate-700">رقم الهاتف</TableHead>
              <TableHead className="p-6 text-right font-black text-slate-700">الدور</TableHead>
              <TableHead className="p-6 text-right font-black text-slate-700">تاريخ الانضمام</TableHead>
              <TableHead className="p-6 text-center font-black text-slate-700">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeesArray.map((emp) => {
              const isAdmin = emp.role === 'admin' || emp.role === 'مدير';
              
              return (
                <TableRow key={emp.id} className="border-b border-slate-50/80 hover:bg-slate-50/30 transition-colors">
                  {/* عمود الموظف */}
                  <TableCell className="p-6 text-right">
                    <div className="flex items-center gap-3 justify-start">
                      <div className="w-10 h-10 bg-[#0f172a] text-white rounded-xl flex items-center justify-center font-black text-sm uppercase shrink-0">
                        {emp.name ? emp.name.trim().charAt(0).toUpperCase() : 'U'}
                      </div>
                      <span className="font-black text-[#0f172a] whitespace-nowrap">{emp.name || "مجهول"}</span>
                    </div>
                  </TableCell>

                  {/* عمود رقم الهاتف */}
                  <TableCell className="p-6 text-right font-bold text-slate-600 tracking-wide">
                    {emp.phone || "—"}
                  </TableCell>

                  {/* عمود الدور المصلح ديناميكياً */}
                  <TableCell className="p-6 text-right">
                    {isAdmin ? ( 
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#3198c1] rounded-full text-[10px] font-black w-fit">
                        <ShieldCheck size={12} /> مدير النظام
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black w-fit">
                        <User size={12} /> موظف فرع
                      </span>
                    )}
                  </TableCell>

                  {/* عمود تاريخ الانضمام */}
                  <TableCell className="p-6 text-right text-xs font-bold text-slate-400 whitespace-nowrap">
                    {formatDate(emp.created_at || emp.date)}
                  </TableCell>

                  {/* عمود العمليات */}
                  <TableCell className="p-6 text-center">
                    <div className="flex justify-center gap-2" dir="ltr">
                      <button 
                        onClick={() => onEdit(emp)} 
                        className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all active:scale-95" 
                        title="تعديل"
                      >
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => onDelete(emp.id)} 
                        className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all active:scale-95" 
                        title="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* 2. نسخة الهواتف (Mobile) */}
      <div className="md:hidden space-y-4">
        {employeesArray.map((emp) => {
          const isAdmin = emp.role === 'admin' || emp.role === 'مدير';

          return (
            <div key={emp.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4 text-right">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0f172a] text-white rounded-xl flex items-center justify-center font-black text-sm uppercase">
                    {emp.name ? emp.name.trim().charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="font-black text-[#0f172a]">{emp.name || "مجهول"}</span>
                </div>
                
                {/* تعديل العرض الديناميكي هنا أيضاً لمنع قراءة الأدمن كموظف عادي على الموبايل */}
                {isAdmin ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-[#3198c1] rounded-full text-[10px] font-black">
                    <ShieldCheck size={12} /> مدير
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black">
                    <User size={12} /> موظف
                  </span>
                )}
              </div>

              <div className="text-sm font-bold text-slate-600 flex justify-between items-center">
                <span className="text-slate-400 text-xs">رقم الهاتف:</span>
                <span className="tracking-wide">{emp.phone || "—"}</span>
              </div>

              <div className="border-t border-slate-50 pt-3 flex justify-between items-center">
                <span className="text-xs font-bold text-slate-400">{formatDate(emp.created_at || emp.date)}</span>
                <div className="flex justify-center gap-2" dir="ltr">
                  <button onClick={() => onEdit(emp)} className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                    <Edit3 size={16} />
                  </button>
                  <button onClick={() => onDelete(emp.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. شاشة خلو البيانات */}
      {employeesArray.length === 0 && (
        <div className="p-16 bg-white border border-dashed border-slate-200 rounded-[32px] text-center text-slate-400 font-bold text-sm">
          لا يوجد موظفين مسجلين في هذا الفرع حالياً
        </div>
      )}
    </div>
  );
}

export default EmployeeList;