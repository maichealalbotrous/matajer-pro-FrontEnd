import { User, Bell, Menu, X } from 'lucide-react'
import React from 'react'

function HeaderDashboard({ Data = { name: "أحمد محمد", role: "مدير النظام" }, onMenuClick, isOpen }) {
  return (
    <header className="w-full bg-white/60 backdrop-blur-xl border-b border-slate-50 sticky top-0 z-30 px-6 py-4" dir="rtl">
      <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick} 
            className="p-2 bg-slate-100 rounded-xl md:hidden text-[#0f172a]"
          >
            {isOpen ? <X size={20}/> : <Menu size={20} />}
          </button>
          <h2 className="text-lg font-black text-[#0f172a] hidden md:block">لوحة صاحب العمل</h2>
        </div>

        <div className="flex items-center gap-6">
          <button className="relative p-2.5 bg-slate-50 text-slate-400 hover:text-[#0f172a] rounded-full transition-all group">
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <div className="flex items-center gap-3 pl-2 border-r border-slate-100 mr-2">
             <div className="text-left flex flex-col items-start hidden sm:flex">
                <span className="text-sm font-black text-[#0f172a] leading-none">{Data.name}</span>
                <span className="text-[10px] font-bold text-slate-400 mt-1">{Data.role === 'admin' ? 'مدير النظام' : 'مستخدِم'}</span>
             </div>
             <div className="relative">
                <div className="w-11 h-11 bg-slate-100 rounded-full flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                  <User className="text-[#0f172a] w-6 h-6" />
                </div>
                <span className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
             </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderDashboard;