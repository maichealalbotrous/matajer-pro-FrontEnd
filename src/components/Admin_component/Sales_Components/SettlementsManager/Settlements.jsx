import React, { useState } from 'react';
import { Search, Download, Filter, Calendar } from 'lucide-react';
import SettlementItemCard from '../SettlementItemCard/SettlementItemCard';
import SettlementDetailModal from '../SettlementDetailModal/SettlementDetailModal';
import SettlementStats from '../SettlementStats/SettlementStats';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';


function Settlements() {
  const [period, setPeriod] = useState('monthly'); 
  const [CustomDates, SetCustomDates] = useState({ from: '', to: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  {/* mock api data */}
  const [apiData, SetApiData] = useState({
    statistics: {
      settlements_count: 3,
      total_gross_revenue: 4800,
      total_expenses: 400.75,
      total_net_profit: 4399.25
    },
    data: [
      { id: "8842", branch: "فرع الحمراء", date: "2026-04-15", amount: "240.00", status: "completed" },
      { id: "8841", branch: "المتجر الإلكتروني", date: "2026-04-15", amount: "1,150.00", status: "completed" },
    ]
  });

  {/* handle period change */}
  const handlePeriodChange = (newPeriod) => {
    setPeriod(newPeriod);
  };

  {/*////////////////////////////////////////////////////////////////////////////////////////// */}
  {/*////////////////////////////////////////////////////////////////////////////////////////// */}


  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-8" dir="rtl">
        {/* the main content */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a] mb-2">تسويات الفرع</h1>
          <p className="text-slate-400 font-bold">عرض التقارير المالية لفرعك حسب الفترة الزمنية.</p>
        </div>

              <div className="flex bg-white p-1.5 rounded-2xl border border-slate-100 shadow-sm w-fit" dir="rtl">
          {['today', 'weekly', 'monthly', 'yearly'].map((p) => (
            <MyButton 
              key={p}
              title={
                p === 'today' ? 'اليوم' : 
                p === 'weekly' ? 'الأسبوع' : 
                p === 'monthly' ? 'الشهر' : 'السنة'
              }
              onClick={() => handlePeriodChange(p)}
              className={`
                px-6 py-2.5 rounded-xl text-xs font-black
                ${period === p 
                  ? 'bg-[#050b1a] text-white shadow-lg' 
                  : 'bg-transparent text-slate-400 hover:bg-slate-50'
                }
              `}
            />
          ))}
        </div>
      </div>


{/* the main statistics section */}
      <SettlementStats statistics={apiData.statistics} />

      <div className="flex flex-col xl:flex-row gap-4">
        <div className="flex-1">
        <MyInput
          type="text" 
          placeholder="بحث برقم التسوية..." 
          Icon={<Search size={20} />} 
        />
      </div>

        <div className="flex items-center gap-3 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
         {/* the custom date range filter */}
           <div className="flex items-center gap-2 px-3">
             <span className="text-[10px] font-bold text-slate-400">من</span>
             <input type="date" className="text-xs font-bold outline-none border-none bg-transparent" />
           </div>
           <div className="w-[1px] h-8 bg-slate-100"></div>
          {/* the custom date range filter */}
           <div className="flex items-center gap-2 px-3">
             <span className="text-[10px] font-bold text-slate-400">إلى</span>
             <input type="date" className="text-xs font-bold outline-none border-none bg-transparent" />
           </div>
           <MyButton title={<Filter size={18} />} className="bg-[#050b1a] text-white p-3 rounded-xl hover:scale-105 transition-all"/>

           
        </div>

        <MyButton title={   <Download size={18} />} className="flex items-center justify-center gap-3 bg-white px-8 py-5 rounded-[24px] border border-slate-100 font-black text-[#0f172a] hover:bg-slate-50 shadow-sm transition-all"/>
       
      </div>

{/* the settlements list section */}
      <SettlementItemCard 
        settlementsData={apiData.data} 
        onShow={(item) => { setSelectedData(item); setIsModalOpen(true); }} 
        onDelete={(id) => console.log("حذف", id)} 
      />

{/* the settlement detail modal */}
      <SettlementDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedData} 
      />
    </div>
  );
}

export default Settlements;