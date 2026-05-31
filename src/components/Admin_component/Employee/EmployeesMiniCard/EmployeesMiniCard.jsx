import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';

function EmployeesMiniCard({ EmployeeData = [], isLoading }) {
  const displayEmployees = EmployeeData.slice(0, 3);
  const remainingCount = EmployeeData.length > 3 ? EmployeeData.length - 3 : 0;

  const getInitials = (name) => {
    if (!name) return "?";
    return name.trim().charAt(0).toUpperCase();
  };

  return (
    <Link to="/Employees" className="block cursor-pointer bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex flex-col items-center text-center hover:shadow-md transition-all h-full min-h-[320px] justify-between" dir="rtl">
      
      {/* القسم العلوي: الأيقونة والعناوين */}
      <div className="w-full flex flex-col items-center">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-6">
          <Users size={24} />
        </div>

        <h3 className="text-xl font-black text-[#0f172a] mb-2">الموظفين</h3>
        
        {isLoading ? (
          <div className="h-4 bg-slate-100 rounded w-2/3 animate-pulse mb-6"></div>
        ) : (
          <p className="text-xs text-slate-400 font-bold mb-6">
            {EmployeeData.length} {EmployeeData.length >= 3 && EmployeeData.length <= 10 ? "موظفين مسجلين" : "موظف مسجل"}. إدارة الصلاحيات ومتابعة الحضور.
          </p>
        )}
      </div>

      {/* القسم الأوسط: التكديس الدائري للموظفين (Avatar Stack) */}
      <div className="flex flex-row-reverse justify-center items-center mb-8 h-10 w-full">
        {isLoading ? (
          // تأثير الهيكل النبضي (Skeleton Animation) للأفاتارز
          <div className="flex -space-x-3 space-x-reverse animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200"></div>
            ))}
          </div>
        ) : EmployeeData.length === 0 ? (
          // حالة عدم وجود موظفين مسجلين بالسيرفر
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold">
            <UserPlus size={14} className="text-slate-300" />
            <span>لا يوجد موظفين مسجلين بعد</span>
          </div>
        ) : (
          // عرض الموظفين الفعليين
          <>
            {displayEmployees.map((e, index) => (
              <div 
                key={e.id || index} 
                className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-[#050b1a] shadow-sm flex items-center justify-center text-[10px] text-white font-black uppercase transition-transform hover:-translate-y-1"
                title={e.name}
              >
                <span>{getInitials(e.name)}</span>
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-500 z-10">
                +{remainingCount}
              </div>
            )}
          </>
        )}
      </div>

      {/* القسم السفلي: زر التوجيه السريع */}
      <div className="w-full py-3 rounded-full border border-slate-100 text-xs font-black text-slate-500 hover:bg-[#050b1a] hover:text-white transition-all text-center">
        إدارة الفرق
      </div>
    </Link>
  );
}

export default EmployeesMiniCard;