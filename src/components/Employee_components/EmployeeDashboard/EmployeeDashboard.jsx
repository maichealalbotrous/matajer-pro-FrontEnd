import React from 'react';
import { Menu } from 'lucide-react';
import NewInvoiceCard from '../Invoices/NewInvoiceCard/NewInvoiceCard';
import EmployeeSideBar from '../EmployeeSideBar/EmployeeSideBar';
import MyButton from '@/components/MyButton/MyButton';

const EmployeeDashboard = () => {

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      

      <main className="flex-1 flex flex-col items-center justify-center p-6 relative">
        
        <div  
         className="fixed top-6 right-6 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm md:hidden z-30">
        <MyButton/>
          <Menu size={24} className="text-[#0f172a]" /> 
          </div>
        
        <div className="w-full max-w-sm">
          <NewInvoiceCard onOpenBilling={() => console.log("فتح شاشة البيع")} />
        </div>
      </main>

    </div>
  );
};

export default EmployeeDashboard;