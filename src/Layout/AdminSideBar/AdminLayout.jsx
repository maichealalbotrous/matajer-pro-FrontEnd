import HeaderDashboard from '@/components/Admin_component/HeaderDashboard/HeaderDashboard';
import SideBarDashboard from '@/components/Admin_component/SideBarDashboard/SideBarDashboard';
import React, { useEffect, useState } from 'react';

export const AdminLayout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [userData, setUserData] = useState({ name: "جاري التحميل...", role: "مستخدِم" });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (e) {
        console.error(e, "خطأ في قراءة بيانات المستخدم من الذاكرة");
      }
    }
  }, []);

  return (
    <div className="flex h-screen max-h-screen w-screen bg-[#fcfcfc] overflow-hidden fixed inset-0" dir="rtl">
      
      <SideBarDashboard isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      <div className="flex-1 flex flex-col min-w-0 h-full max-h-screen overflow-hidden">
        
        <HeaderDashboard 
          onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
          isOpen={isMenuOpen} 
          Data={userData}
        />
        
        <main className="flex-1 bg-[#f8fafc] p-4 md:p-8 lg:p-10 overflow-y-auto min-h-0">
          <div className="max-w-[1600px] mx-auto pb-10"> 
            {children}
          </div>
        </main>

      </div>
    </div>
  );
};