import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutGrid, 
  MapPin, 
  CreditCard, 
  Key, 
  Settings, 
  LogOut,
  Code
} from 'lucide-react';

function ProgrammerSidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { name: 'ProgramerDashboard', icon: LayoutGrid, label: 'لوحة التحكم' },
    { name: 'ProgramerBranches', icon: MapPin, label: 'الفروع' },
    { name: 'payments', icon: CreditCard, label: 'المدفوعات والمالية' },
    { name: 'subscriptions', icon: Key, label: 'مفاتيح الاشتراك' },
    { name: 'configs', icon: Settings, label: 'إعدادات النظام العامة' },
  ];

  return (
    <>
      {/* Overlay للموبايل */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Aside Container */}
      <aside className={`fixed right-0 top-0 h-screen w-72 bg-white border-l border-slate-100 flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} md:relative md:flex`} dir="rtl">
        
        {/* Header */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#050b1a] rounded-xl flex items-center justify-center shadow-lg shadow-black/20 text-white">
            <Code size={22} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[15px] font-black text-[#0f172a] leading-tight tracking-tight">Sand Programmer</h1>
            <span className="text-[10px] font-bold text-[#3198c1] opacity-80">لوحة تحكم المبرمج</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2 mt-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={`/${item.name}`} 
              className={({ isActive }) => `
                cursor-pointer w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group
                ${isActive ? 'bg-slate-50 text-[#0f172a]' : 'text-slate-400 hover:bg-slate-50/50 hover:text-slate-600'}
              `}
            >
              <span className="text-sm font-bold">{item.label}</span>
              <item.icon className="w-5 h-5" />
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-8 mt-auto">
          <button className="w-full bg-red-50 text-red-500 flex items-center justify-center gap-3 py-4 rounded-full hover:bg-red-100 transition-all active:scale-95 group">
             <LogOut size={20} />
             <span className="text-sm font-black tracking-wide">تسجيل الخروج</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default ProgrammerSidebar;