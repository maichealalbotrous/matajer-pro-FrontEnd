import { Store, Box } from "lucide-react";


//  const testData = [
//     { name: "فرع النخيل مول", location: "الرياض، مخرج 9" },
//     { name: "فرع الحمراء", location: "جدة، حي الأندلس" },
//     { name: "فرع مكة الرئيسي", location: "مكة المكرمة، الشوقية" },
//     { name: "فرع مكة الرئيسي", location: "مكة المكرمة، الشوقية" },
//     { name: "فرع مكة الرئيسي", location: "مكة المكرمة، الشوقية" }

// ];

//  const employeeData = [
//     { name: "Alice" },
//     { name: "Bob" },
//     { name: "Charlie" },
//     { name: "David" },

// ];

function BranchCard({ BrachData , Employee  }) {
  return (
    <main className="w-full px-4 py-8" dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        
        {BrachData && BrachData.map((branch, index) => (
          <div 
            key={index}
            className="relative w-full max-w-sm overflow-hidden bg-[#e0f2fe] rounded-[2.5rem] p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200/50 hover:-translate-y-2 border border-blue-50 group cursor-pointer"
          >

            <div className="flex justify-between items-start mb-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0">
                <Box className="w-7 h-7 text-[#0f172a]" />
              </div>

              <div className="text-left flex flex-col items-end">
                <div className="flex items-center gap-1.5 text-[#3198c1] mb-1">
                  <Store className="w-3.5 h-3.5" />
                </div>
                <h3 className="text-2xl font-black text-[#0f172a] mb-1">
                  {branch.name}
                </h3>
                <p className="text-slate-500 text-sm font-medium">
                  {branch.location}
                </p>
              </div>
            </div>


            <div className="flex justify-between items-center mt-6">
              <div className="flex items-center gap-2 text-slate-600">
                <span className="text-sm font-bold">موظفين نشطين</span>
              </div>


              <div className="flex -space-x-3 space-x-reverse">
                {Employee && Employee.slice(0, 3).map((emp, empIndex) => (
                  <div 
                    key={empIndex}
                    title={emp.name} 
                    className={`w-9 h-9 rounded-full border-2 border-white shadow-sm z-${30 - empIndex * 10} 
                      ${empIndex === 0 ? 'bg-slate-200 flex items-center justify-center text-[10px] font-black' : 
                        empIndex === 1 ? 'bg-blue-300' : 'bg-blue-100'}`}
                  >
                    {empIndex === 0 && `+${Employee.length}`}
                  </div>
                ))}
              </div>
            </div>


            <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}

      </div>
    </main>
  );
}

export default BranchCard;