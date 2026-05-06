import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit2, Trash2 } from 'lucide-react';

const PaymentsTable = ({ payments, onDelete, onEdit }) => (
  <div className="bg-white rounded-[30px] border shadow-sm overflow-hidden">
    <Table>
      <TableHeader className="bg-slate-50">
        <TableRow>
          <TableHead>المرجع</TableHead>
          <TableHead>المبلغ</TableHead>
          <TableHead>العملة</TableHead>
          <TableHead>طريقة الدفع</TableHead>
          <TableHead>التاريخ</TableHead>
          <TableHead>الإجراءات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-bold">{p.reference_number}</TableCell>
            <TableCell className="text-[#3198c1] font-black">{p.amount_paid}</TableCell>
            <TableCell>{p.currency}</TableCell>
            <TableCell>{p.payment_method}</TableCell>
            <TableCell>{new Date(p.created_at).toLocaleDateString('ar-SA')}</TableCell>
            <TableCell className="flex gap-2">
              <button onClick={() => onEdit(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><Edit2 size={16}/></button>
              <button onClick={() => onDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={16}/></button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default PaymentsTable;