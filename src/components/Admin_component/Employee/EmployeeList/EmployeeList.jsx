import React from 'react';
import { Trash2, Edit3, ShieldCheck } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function EmployeeList({ employees = [], onEdit, onDelete }) {
  const employeesArray = Array.isArray(employees) ? employees : Object.values(employees);

  return (
    <div className="w-full" dir="rtl">
      {/* 1.(Desktop) */}
      <div className="hidden md:block bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-hidden">
        <Table className="text-right">
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none">
              <TableHead className="p-6">الموظف</TableHead>
              <TableHead className="p-6">رقم الهاتف</TableHead>
              <TableHead className="p-6">الدور</TableHead>
              <TableHead className="p-6">تاريخ الانضمام</TableHead>
              <TableHead className="p-6 text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employeesArray.map((emp) => (
              <TableRow key={emp.id} className="border-slate-50 hover:bg-slate-50/30">
                <TableCell className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0f172a] text-white rounded-xl flex items-center justify-center font-black">
                      {emp.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-black text-[#0f172a]">{emp.name}</span>
                  </div>
                </TableCell>
                <TableCell className="p-6 font-bold text-slate-600">{emp.phone}</TableCell>
                <TableCell className="p-6">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black flex items-center gap-1 w-fit">
                    <ShieldCheck size={12} /> موظف
                  </span>
                </TableCell>
                <TableCell className="p-6 text-xs font-bold text-slate-400">
                  {new Date(emp.created_at).toLocaleDateString('ar-EG')}
                </TableCell>
                <TableCell className="p-6">
                  <div className="flex justify-center gap-2">
                    <button onClick={() => onEdit(emp)} className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => onDelete(emp.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 2. Mobile) */}
      <div className="md:hidden space-y-4">
        {employeesArray.map((emp) => (
          <div key={emp.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0f172a] text-white rounded-xl flex items-center justify-center font-black">
                  {emp.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-black text-[#0f172a]">{emp.name}</span>
              </div>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black flex items-center gap-1 w-fit">
                <ShieldCheck size={12} /> موظف
              </span>
            </div>
            <div className="text-sm font-bold text-slate-600 flex justify-between">
              <span>الهاتف:</span>
              <span>{emp.phone}</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">{new Date(emp.created_at).toLocaleDateString('ar-EG')}</span>
              <div className="flex justify-center gap-2">
                <button onClick={() => onEdit(emp)} className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                  <Edit3 size={18} />
                </button>
                <button onClick={() => onDelete(emp.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {employeesArray.length === 0 && (
        <div className="p-10 text-center text-slate-400 font-bold">لا يوجد موظفين حالياً</div>
      )}
    </div>
  );
}

export default EmployeeList;