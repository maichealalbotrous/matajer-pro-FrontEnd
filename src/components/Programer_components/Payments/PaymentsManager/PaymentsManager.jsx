import React, { useState } from 'react';
import { Plus, Menu } from 'lucide-react'; // تأكد من إضافة Menu هنا
import PaymentDialog from '../PaymentDialog/PaymentDialog';
import PaymentsTable from '../PaymentsTable/PaymentsTable';
import { testPayments } from './lib';

const PaymentsManager = ({ isOpen, setIsOpen }) => {
  const [totalReceived, SetTotalReceived] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);

  const branchId = 1;

  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <div className="flex justify-between items-center flex-wrap gap-2 mb-8">
        
        <div className="flex items-center gap-4">
          {!isOpen && (
            <button 
              onClick={() => setIsOpen(true)}
              className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Menu size={20} className="text-[#0f172a]" />
            </button>
          )}
          <h2 className="text-2xl font-black text-[#0f172a]">المدفوعات والمالية</h2>
        </div>

        <div className="flex gap-4">
           <div className="bg-white px-6 py-3 rounded-2xl border font-bold">
             الإجمالي: {totalReceived}
           </div>
           <button onClick={() => { setCurrentPayment(null); setIsDialogOpen(true); }} className="bg-[#0f172a] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold">
             <Plus size={18} /> إضافة دفعة
           </button>
        </div>
      </div>

      <PaymentsTable
        payments={testPayments}
        onEdit={(p) => { setCurrentPayment(p); setIsDialogOpen(true); }} 
      />
      
      <PaymentDialog
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        payment={currentPayment} 
        branchId={branchId}
      />
    </div>
  );
};

export default PaymentsManager;