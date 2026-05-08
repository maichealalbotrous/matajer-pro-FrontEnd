import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard';
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard';
import React, { useState } from 'react';

export const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div className="flex h-screen bg-[#fcfcfc] " dir="rtl">
  
      {isMenuOpen && (
        <div className="hidden md:block w-72 h-full shrink-0 border-l border-slate-100 shadow-sm">
          <SideBarDashboard isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
        </div>
      )}

      <div className="md:hidden">
         <SideBarDashboard isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      </div>

      <div className="flex-1 flex flex-col min-w-0 h-full">
        <HeaderDashboard 
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
          isOpen={isMenuOpen} 
        />
        
        <main className=" flex-1   bg-[#f8fafc] p-4 md:p-8 lg:p-10">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};