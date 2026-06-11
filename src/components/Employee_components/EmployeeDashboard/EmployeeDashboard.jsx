import React from 'react';
import { Menu } from 'lucide-react';
import NewInvoiceCard from '../Invoices/NewInvoiceCard/NewInvoiceCard';

const EmployeeDashboard = () => {

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        <div className="w-full max-w-sm">
          <NewInvoiceCard onOpenBilling={() => console.log("فتح شاشة البيع")} />
        </div>
      </main>

    </div>
  );
};

export default EmployeeDashboard;