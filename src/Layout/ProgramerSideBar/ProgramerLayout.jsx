import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ProgrammerSidebar from "@/components/Programer_components/ProgrammerSidebar/ProgrammerSidebar";

export const ProgramerLayout = ({ children }) => {
  // الحالة الافتراضية مغلقة للموبايل وتفتح حسب التجاوب
  const [isOpen, setIsOpen] = useState(false); 

  return (
    <div className="flex min-h-screen bg-[#fcfcfc]" dir="rtl">
      {/* القائمة الجانبية للمبرمج */}
      <ProgrammerSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* 🌟 الهيدر العلوي للموبايل فقط - مقتبس وموحد تماماً مع منطق الموظف */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-[#0f172a]">Sand Programmer</span>
            <span className="text-[9px] font-bold text-[#3198c1] bg-sky-50 px-2 py-0.5 rounded-md">لوحة المبرمج</span>
          </div>
          
          <button 
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl text-[#0f172a] transition-colors focus:outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {/* جسد المحتوى الرئيسي المستمع للتغيرات */}
        <main className="flex-1 h-full overflow-y-auto">
          {React.cloneElement(children, { isOpen, setIsOpen })}
        </main>
      </div>
    </div>
  );
};

export default ProgramerLayout;