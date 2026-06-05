import React, { useState } from 'react';
import { Users, RefreshCw, Trash2, Calendar, CheckCircle, XCircle } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyButton from '@/components/MyButton/MyButton';

const BranchTable = ({ branches = [], onToggle, onDelete, onRenew }) => {
  const [actionId, setActionId] = useState(null);

  const handleToggle = async (id) => {
    setActionId(id);
    await onToggle(id);
    setActionId(null);
  };

  if (branches.length === 0) {
    return (
      <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm p-8 text-center text-slate-400 font-bold">
        لا توجد فروع مسجلة حالياً في النظام.
      </div>
    );
  }

  return (
    <>
      {/**Mobile states  */}
      <div className="block md:hidden space-y-4" dir="rtl">
        {branches.map((branch) => (
          <div 
            key={branch.id} 
            className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm space-y-4 text-right"
          >
            {/* Header*/}
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="font-black text-base text-[#0f172a]">{branch.id}</h3>
              <h3 className="font-black text-base text-[#0f172a]">{branch.name}</h3>
              <MyButton
                title={actionId === branch.id ? 'جاري...' : (branch.is_active ? 'نشط' : 'متوقف')}
                onClick={() => handleToggle(branch.id)}
                disabled={actionId === branch.id}
                className={`px-3 py-1 rounded-full text-[11px] font-black transition-all w-fit ${
                  branch.is_active 
                    ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                    : 'bg-red-50 text-red-600 hover:bg-red-100'
                }`}
              />
            </div>

            {/* branch detailes*/}
            <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
              <div className="flex items-center gap-2 text-slate-500">
                <Users size={14} className="text-slate-400" />
                <span className="font-medium">المستخدمين:</span>
                <span className="font-black text-slate-700">{branch.users_count || 0}</span>
              </div>
              
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={14} className="text-slate-400" />
                <span className="font-medium">تاريخ الانتهاء:</span>
                <span className="font-black text-slate-700">
                  {branch.expiry_date ? branch.expiry_date : 'غير محدد'}
                </span>
              </div>
            </div>

            {/* buttons */}
            <div className="flex gap-2 pt-3 border-t border-slate-50">
              <button 
                onClick={() => onRenew(branch)} 
                className="flex-1 flex items-center justify-center gap-1.5 text-[#3198c1] bg-blue-50/50 hover:bg-blue-50 py-2.5 rounded-xl text-xs font-bold transition-colors"
                title="تجديد يدوياً"
              >
                <RefreshCw size={14} />
                <span>تجديد يدوياً</span>
              </button>
              
              <button 
                onClick={() => onDelete(branch)} 
                className="flex-1 flex items-center justify-center gap-1.5 text-red-500 bg-red-50/50 hover:bg-red-50 py-2.5 rounded-xl text-xs font-bold transition-colors"
                title="حذف الفرع"
              >
                <Trash2 size={14} />
                <span>حذف الفرع</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* (Table) - for windows*/}
      <div className="hidden md:block bg-white rounded-[30px] border border-slate-100 shadow-sm overflow-hidden">
        <Table dir="rtl">
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead className="font-black text-right text-slate-700">رقم الفرع</TableHead>
              <TableHead className="font-black text-right text-slate-700">اسم الفرع</TableHead>
              <TableHead className="font-black text-right text-slate-700">المستخدمين</TableHead>
              <TableHead className="font-black text-right text-slate-700">تاريخ الانتهاء</TableHead>
              <TableHead className="font-black text-right text-slate-700">الحالة</TableHead>
              <TableHead className="font-black text-right text-slate-700">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branches.map((branch) => (
              <TableRow key={branch.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-black text-[#0f172a]">{branch.id}</TableCell>
                <TableCell className="font-black text-[#0f172a]">{branch.name}</TableCell>
                <TableCell className="text-slate-500">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-slate-400" /> 
                    <span className="font-bold">{branch.users_count || 0}</span>
                  </div>
                </TableCell>
                <TableCell className="text-slate-500 font-bold">
                  {branch.expiry_date ? branch.expiry_date : 'غير محدد'}
                </TableCell>
                <TableCell>
                  <MyButton
                    title={actionId === branch.id ? 'جاري...' : (branch.is_active ? 'نشط' : 'متوقف')}
                    onClick={() => handleToggle(branch.id)}
                    disabled={actionId === branch.id}
                    className={`px-4 py-1.5 rounded-full text-[11px] font-black transition-all min-w-[70px] ${
                      branch.is_active 
                        ? 'bg-green-50 text-green-600 hover:bg-green-100' 
                        : 'bg-red-50 text-red-600 hover:bg-red-100'
                    }`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => onRenew(branch)} 
                      className="text-[#3198c1] hover:bg-blue-50 p-2 rounded-xl transition-colors"
                      title="تجديد يدوياً"
                    >
                      <RefreshCw size={18} />
                    </button>
                    <button 
                      onClick={() => onDelete(branch)} 
                      className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                      title="حذف الفرع"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default BranchTable;