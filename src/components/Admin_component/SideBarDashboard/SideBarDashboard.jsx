import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutGrid, ShoppingBag, Package, BarChart3, Settings, Plus, BookOpen, X } from 'lucide-react';

function SideBarDashboard({ isOpen, setIsOpen }) {
  const [IsActive, SetIsActive] = useState('Dashboard');

  const menuItems = [
    { name: 'AdminDashboard', icon: LayoutGrid, label: 'لوحة التحكم' },
    { name: 'Settlements', icon: ShoppingBag, label: 'المبيعات' },
    { name: 'Inventory', icon: Package, label: 'المخزون' },
    { name: 'Reports', icon: BarChart3, label: 'التقارير' },
    { name: 'Settings', icon: Settings, label: 'الإعدادات' },
  ];

  return (
    <>

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}



      <aside className={`fixed right-0 top-0 h-screen w-72 bg-white border-l border-slate-100 flex flex-col z-50 transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'} md:relative md:flex`} dir="rtl">
        

        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-[#050b1a] rounded-xl flex items-center justify-center shadow-lg shadow-black/20 text-white">
            <BookOpen size={22} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[15px] font-black text-[#0f172a] leading-tight tracking-tight">The Editorial POS</h1>
            <span className="text-[10px] font-bold text-[#3198c1] opacity-80">نظام الإدارة الراقي</span>
          </div>
        </div>


        <nav className="flex-1 px-6 space-y-2 mt-4">
      {menuItems.map((item) => (
  <NavLink
    key={item.name}
    to={`/${item.name}`} 
    className={({ isActive }) => `
      cursor-pointer w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all group
      ${isActive ? 'bg-slate-50 text-[#0f172a] shadow-sm' : 'text-slate-400 hover:bg-slate-50/50 hover:text-slate-600'}
    `}
  >
    <span className="text-sm font-bold">{item.label}</span>
    <item.icon className="w-5 h-5" />
  </NavLink>
))}
        </nav>


        <div className="p-8 mt-auto">
          <button className="w-full bg-[#050b1a] text-white flex items-center justify-center gap-3 py-4 rounded-full shadow-2xl shadow-black/20 hover:bg-black transition-all active:scale-95 group">
             <Plus size={20} className="group-hover:rotate-90 transition-transform" />
             <span className="text-sm font-black tracking-wide">بيع سريع</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideBarDashboard;