import React, { useState } from 'react';
import { Menu, X, BookOpen } from 'lucide-react';
import EmployeeSideBar from '@/components/Employee_components/EmployeeSideBar/EmployeeSideBar';
function EmployeeLayout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      <EmployeeSideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header for Mobile only */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-30">
        
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-slate-50 rounded-xl text-[#0f172a]"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* Page Content - هنا يتم عرض الـ children بدلاً من الـ Outlet */}
        <main className="flex-1 h-full">
          {children}
        </main>
      </div>
    </div>
  );
}

export default EmployeeLayout;