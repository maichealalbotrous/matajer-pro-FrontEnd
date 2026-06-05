import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const KeyTable = ({ keys = [] }) => (
  <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm overflow-hidden">
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>
          <TableHead className="text-right font-black text-slate-700">كود الاشتراك</TableHead>
          <TableHead className="text-right font-black text-slate-700">المدة</TableHead>
          <TableHead className="text-right font-black text-slate-700">الحالة</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {keys.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center py-8 text-slate-400 font-bold">
              لا توجد أكواد اشتراكات مسجلة حالياً.
            </TableCell>
          </TableRow>
        ) : (
          keys.map((key) => (
            <TableRow key={key.id} className="hover:bg-slate-50/50 transition-colors">
              <TableCell className="font-mono font-black text-slate-800 tracking-wider select-all">{key.license_key}</TableCell>
              <TableCell className="font-bold text-slate-600">{key.duration_months} أشهر</TableCell>
              <TableCell>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black ${key.is_used ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
                  {key.is_used ? 'تم الاستخدام' : 'متاح'}
                </span>
              </TableCell>

            <TableCell>
            {(() => {
              const currentDate = new Date();
              const deactivationDate = key.deactivated_at ? new Date(key.deactivated_at) : null;
              
              let statusText = 'متاح';
              let statusStyle = 'bg-green-50 text-green-600';

              if (Number(key.is_used) === 1) {
                if (deactivationDate && currentDate > deactivationDate) {
                  statusText = 'منتهي الصلاحية';
                  statusStyle = 'bg-red-50 text-red-600';
                } else {
                  statusText = 'نشط / مستخدم';
                  statusStyle = 'bg-blue-50 text-blue-600';
                }
              } else if (deactivationDate && currentDate > deactivationDate) {
                statusText = 'منتهي الصلاحية';
                statusStyle = 'bg-red-50 text-red-600';
              }

              return (
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-black transition-colors ${statusStyle}`}>
                  {statusText}
                </span>
              );
            })()}
          </TableCell>

            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  </div>
);

export default KeyTable;