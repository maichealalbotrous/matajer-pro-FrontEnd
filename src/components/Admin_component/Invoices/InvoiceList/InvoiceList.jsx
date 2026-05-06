import React from 'react';
import { Eye, CheckCircle, RotateCcw } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function InvoiceList({ invoices = [], onView, onApprove, onRevert }) {

  
  const Actions = ({ inv, onView, onApprove, onRevert }) => (
  <div className="flex justify-center gap-2">
    <button onClick={() => onView(inv.id)} className="p-2 bg-slate-100 text-slate-600 rounded-xl hover:bg-[#0f172a] hover:text-white transition-all"><Eye size={18} /></button>
    {inv.status === 'pending' ? (
      <button onClick={() => onApprove(inv.id)} className="p-2 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all"><CheckCircle size={18} /></button>
    ) : (
      <button onClick={() => onRevert(inv.id)} className="p-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"><RotateCcw size={18} /></button>
    )}
  </div>
);

  return (
    <div className="w-full max-w-7xl mx-auto" dir="rtl">
      
      <div className="hidden md:block bg-white rounded-[32px] border border-slate-50 shadow-sm overflow-x-auto">
        <Table className="w-full">
          <TableHeader className="bg-slate-50/50">
            <TableRow className="border-none">
              <TableHead className="p-6 text-right">رقم الفاتورة</TableHead>
              <TableHead className="p-6 text-right">الموظف</TableHead>
              <TableHead className="p-6 text-right">المبلغ</TableHead>
              <TableHead className="p-6 text-right">الحالة</TableHead>
              <TableHead className="p-6 text-right">التاريخ</TableHead>
              <TableHead className="p-6 text-center">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices?.map((inv) => (
              <TableRow key={inv.id} className="border-slate-50 hover:bg-slate-50/30">
                <TableCell className="p-6 font-black">#{inv.id}</TableCell>
                <TableCell className="p-6 text-sm font-bold text-slate-600">{inv.user?.name}</TableCell>
                <TableCell className="p-6 font-black">{parseFloat(inv.total_amount).toLocaleString()} ل.س</TableCell>
                <TableCell className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black ${inv.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    {inv.status === 'approved' ? 'معتمدة' : 'عالقة'}
                  </span>
                </TableCell>
                <TableCell className="p-6 text-xs font-bold text-slate-400">{inv.invoice_date}</TableCell>
                <TableCell className="p-6">
                   <Actions inv={inv} onView={onView} onApprove={onApprove} onRevert={onRevert} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

{/*Mobile Size*/}
      <div className="md:hidden space-y-4">
        {invoices?.map((inv) => (
          <div key={inv.id} className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex flex-col gap-3">
            <div className="flex justify-between items-center font-black">
              <span>#{inv.id}</span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black ${inv.status === 'approved' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                {inv.status === 'approved' ? 'معتمدة' : 'عالقة'}
              </span>
            </div>
            <div className="text-sm font-bold text-slate-600">{inv.user?.name}</div>
            <div className="font-black">{parseFloat(inv.total_amount).toLocaleString()} ل.س</div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="text-xs text-slate-400">{inv.invoice_date}</span>
              <Actions inv={inv} onView={onView} onApprove={onApprove} onRevert={onRevert} />
            </div>
          </div>
        ))}
      </div>

      {(!invoices || invoices.length === 0) && (
        <div className="p-10 text-center text-slate-400 font-bold">لا توجد فواتير</div>
      )}
    </div>
  );
}



export default InvoiceList;