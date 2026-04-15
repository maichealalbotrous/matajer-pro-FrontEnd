import { Users } from 'lucide-react';


function EmployeesMiniCard({ EmployeeData = [] }) {
  const displayEmployees = EmployeeData.slice(0, 3);
  const remainingCount = EmployeeData.length > 3 ? EmployeeData.length - 3 : 0;

  return (
    <div className="cursor-pointer bg-white rounded-[32px] p-8 shadow-sm border border-slate-50 flex flex-col items-center text-center" dir="rtl">


      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#0f172a] mb-6">
        <Users size={24} />
      </div>

      <h3 className="text-xl font-black text-[#0f172a] mb-2">الموظفين</h3>
      <p className="text-xs text-slate-400 font-bold mb-6">
        {EmployeeData.length} موظف مسجل. إدارة الصلاحيات ومتابعة الحضور.
      </p>
      
      <div className="flex -space-x-3 space-x-reverse mb-8">
        {displayEmployees.map((e) => (
          <div 
            key={e.id} 
            className="w-10 h-10 rounded-full border-4 border-white overflow-hidden bg-[#050b1a] shadow-sm flex items-center justify-center text-[10px] text-white font-bold"
            title={e.name}
          >
             
              <span>{e.name.charAt(0)}</span>
            
          </div>
        ))}

        {remainingCount > 0 && (
          <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 shadow-sm">
            +{remainingCount}
          </div>
        )}
      </div>

      <button className="w-full py-3 rounded-full border border-slate-100 text-xs font-black text-slate-500 hover:bg-[#050b1a] hover:text-white transition-all duration-300">
        إدارة الفرق
      </button>
    </div>
  );
}

export default EmployeesMiniCard;