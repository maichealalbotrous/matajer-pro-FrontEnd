import React from 'react';
import { Wallet, Key, LayoutGrid } from 'lucide-react';

const StatCard = ({ Data = [], isLoading }) => {
  
  // حساب الإحصائيات من البيانات القادمة من السيرفر بشكل ديناميكي
  const totalRevenue = Data.reduce((sum, item) => sum + (Number(item.revenue) || 0), 0);
  const activeKeysCount = Data.filter(item => item.status === 'active').length;
  const totalBranches = Data.length;

  // بناء هيكل الكروت الثلاثة
  const statsItems = [
    {
      title: "إجمالي الإيرادات",
      value: totalRevenue.toLocaleString(),
      unit: "ل.س",
      subValue: "مجموع الاشتراكات المحصلة",
      trend: 12,
      icon: Wallet,
      colorClass: "bg-blue-50 text-[#3198c1]"
    },
    {
      title: "المفاتيح النشطة",
      value: activeKeysCount,
      unit: "مفتاح",
      subValue: `من أصل ${totalBranches} فروع مفعلة`,
      trend: null,
      icon: Key,
      colorClass: "bg-green-50 text-green-600"
    },
    {
      title: "الفروع المسجلة",
      value: totalBranches,
      unit: "فرع",
      subValue: "إجمالي الفروع على النظام",
      trend: null,
      icon: LayoutGrid,
      colorClass: "bg-purple-50 text-purple-600"
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" dir="rtl">
        {[1, 2, 3].map((idx) => (
          <div key={idx} className="bg-white p-6 rounded-[35px] border border-slate-100 h-44 animate-pulse flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div className="h-4 bg-slate-100 rounded-md w-24" />
              <div className="w-12 h-12 bg-slate-100 rounded-2xl" />
            </div>
            <div className="space-y-2">
              <div className="h-8 bg-slate-100 rounded-md w-20" />
              <div className="h-3 bg-slate-100 rounded-md w-32" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full" dir="rtl">
      {statsItems.map((item, index) => (
        <div 
          key={index} 
          className="bg-white p-6 rounded-[35px] border border-slate-100 shadow-sm flex flex-col justify-between h-44 hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-slate-400 font-bold text-sm">{item.title}</h3>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.colorClass}`}>
              <item.icon size={24} />
            </div>
          </div>
          
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-[#0f172a]">{item.value}</span>
              <span className="text-sm font-bold text-slate-400">{item.unit}</span>
            </div>
            
            <div className="mt-2 flex items-center gap-2">
              {item.trend && (
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${item.trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  {item.trend > 0 ? '+' : ''}{item.trend}%
                </span>
              )}
              <p className="text-slate-400 text-[11px] font-bold">{item.subValue}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCard;