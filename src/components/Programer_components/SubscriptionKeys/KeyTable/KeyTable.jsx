import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// أضفنا = [] هنا لضمان عدم حدوث الخطأ
const KeyTable = ({ keys = [] }) => (
  <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm overflow-hidden">
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>
          <TableHead className="text-right">كود الاشتراك</TableHead>
          <TableHead className="text-right">المدة (بالأشهر)</TableHead>
          <TableHead className="text-right">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.map((key) => (
          <TableRow key={key.id}>
            <TableCell className="font-mono font-bold">{key.license_key}</TableCell>
            <TableCell>{key.duration_months} أشهر</TableCell>
            <TableCell>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${key.is_used ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                {key.is_used ? 'تم الاستخدام' : 'متاح'}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default KeyTable;