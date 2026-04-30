import React from 'react';
import { Users, RefreshCw, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MyButton from '@/components/MyButton/MyButton';

const BranchTable = ({ branches, onToggle, onDelete, onRenew }) => {
  return (
    <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            {/* أضفنا text-right لضمان المحاذاة مع المحتوى في الـ RTL */}
            <TableHead className="font-bold text-right">اسم الفرع</TableHead>
            <TableHead className="font-bold text-right">المستخدمين</TableHead>
            <TableHead className="font-bold text-right">تاريخ الانتهاء</TableHead>
            <TableHead className="font-bold text-right">الحالة</TableHead>
            <TableHead className="font-bold text-right">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {branches.map((branch) => (
            <TableRow key={branch.id} className="hover:bg-slate-50/50">
              <TableCell className="font-bold text-[#0f172a]">{branch.name}</TableCell>
              <TableCell className="flex items-center gap-2 text-slate-500">
                <Users size={16} /> {branch.users_count}
              </TableCell>
              <TableCell className="text-slate-500">{branch.expiry_date}</TableCell>
              <TableCell>
                <MyButton
                  title={branch.is_active ? 'نشط' : 'متوقف'}
                  onClick={() => onToggle(branch.id)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-black ${
                    branch.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                  }`}
                />
              </TableCell>
              <TableCell className="flex gap-3">
                <div onClick={() => onRenew(branch)} className="text-blue-500 hover:bg-blue-50 p-2 rounded-lg cursor-pointer">
                  <RefreshCw size={18} />
                </div>
                <div onClick={() => onDelete(branch.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg cursor-pointer">
                  <Trash2 size={18} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BranchTable;