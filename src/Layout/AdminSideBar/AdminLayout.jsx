import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard';
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard';
import React, { useState } from 'react';

export const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true); 

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      {/* SideBarDashboard*/}
      <SideBarDashboard isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      
      <main className={`flex-1 transition-all duration-300 ${isMenuOpen ? 'md:mr-64' : 'mr-0'}`}>
        <HeaderDashboard 
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
          isOpen={isMenuOpen} 
        />
        
        <div className="p-4 md:p-8">
            {children}
        </div>
      </main>
    </div>
  );
};