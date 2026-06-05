import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext/AuthContext';
import { handleLogoutSubmit } from '@/components/Auth_component/LoginForm/lib';

import { 
  LayoutGrid, 
  ShoppingBag, 
  Package, 
  BarChart3, 
  LogOut,
  BookOpen, 
  RefreshCw 
} from 'lucide-react';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

function SideBarDashboard({ isOpen, setIsOpen }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false); 
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const setAlertConfigPlaceholder = () => {};

  const menuItems = [
    { name: 'AdminDashboard', icon: LayoutGrid, label: 'لوحة التحكم' },
    { name: 'Settlements', icon: ShoppingBag, label: 'المبيعات' },
    { name: 'Inventory', icon: Package, label: 'المخزون' },
    { name: 'Reports', icon: BarChart3, label: 'التقارير' },
  ];

  // دالة تُستدعى عند تأكيد تسجيل الخروج من داخل المودال
  const handleConfirmLogout = () => {
    setIsConfirmOpen(false); // إغلاق المودال
    handleLogoutSubmit({
      setLoading: setIsLoggingOut,
      navigate,
      logout,
      setAlertConfig: setAlertConfigPlaceholder
    });
  };

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
            <BookOpen size={22} />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[15px] font-black text-[#0f172a] leading-tight tracking-tight">The Editorial POS</h1>
            <span className="text-[10px] font-bold text-[#3198c1] opacity-80">نظام الإدارة الراقي</span>
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
                ${isActive ? 'bg-slate-50 text-[#0f172a] shadow-sm' : 'text-slate-400 hover:bg-slate-50/50 hover:text-slate-600'}
              `}
            >
              <span className="text-sm font-bold">{item.label}</span>
              <item.icon className="w-5 h-5" />
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-8 mt-auto">
          <button 
            onClick={() => setIsConfirmOpen(true)} // فتح المودال الفاخر عند الضغط
            disabled={isLoggingOut}
            className="w-full bg-red-50 text-red-500 flex items-center justify-center gap-3 py-4 rounded-full hover:bg-red-100 transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed group"
          >
            {isLoggingOut ? (
              <>
                <RefreshCw size={18} className="animate-spin text-red-500" />
                <span className="text-sm font-black tracking-wide">جاري الخروج...</span>
              </>
            ) : (
              <>
                <LogOut size={20} />
                <span className="text-sm font-black tracking-wide">تسجيل الخروج</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* مودال تأكيد الخروج الفاخر والمخصص */}
      {isConfirmOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-[100] p-4 animate-in fade-in duration-200">
          <DeleteConfirmView
            title="تسجيل الخروج من النظام"
            description="هل أنت متأكد من رغبتك في إنهاء الجلسة الحالية؟ سيتم إبطال صلاحية الدخول وستحتاج لإدخال بياناتك مجدداً لاحقاً."
            confirmText="نعم، سجل الخروج"
            processingText="جاري الخروج..."
            isDeleting={isLoggingOut}
            variant="danger"
            icon={LogOut} // تمرير أيقونة الباب بدلاً من أيقونة السلة التلقائية
            onConfirm={handleConfirmLogout}
            onCancel={() => setIsConfirmOpen(false)}
          />
        </div>
      )}
    </>
  );
}

export default SideBarDashboard;