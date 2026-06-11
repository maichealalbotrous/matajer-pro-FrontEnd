import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import EmployeeSideBar from '@/components/Employee_components/EmployeeSideBar/EmployeeSideBar';

function EmployeeLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      {/* القائمة الجانبية للموظف */}
      <EmployeeSideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* الهيدر العلوي للموبايل فقط */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#0f172a]">The Editorial POS</span>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[#0f172a] transition-colors focus:outline-none"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* محتوى الصفحة الرئيسي */}
        <main className="flex-1 h-full p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

export default EmployeeLayout;