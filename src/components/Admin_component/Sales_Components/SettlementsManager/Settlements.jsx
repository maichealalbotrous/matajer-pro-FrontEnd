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



  {/*////////////////////////////////////////////////////////////////////////////////////////// */}
  {/*////////////////////////////////////////////////////////////////////////////////////////// */}


  return (
   <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-6" dir="rtl">
      
      {/*title and period filters*/}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a] mb-1">تسويات الفرع</h1>
          <p className="text-sm md:text-base text-slate-400 font-bold">عرض التقارير المالية لفرعك حسب الفترة الزمنية.</p>
        </div>

        <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm w-full md:w-fit overflow-x-auto">
          {['today', 'weekly', 'monthly', 'yearly'].map((p) => (
            <button 
              key={p}
              onClick={() => setPeriod(p)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all duration-300 whitespace-nowrap
                ${period === p 
                  ? 'bg-black text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              {p === 'today' ? 'اليوم' : p === 'weekly' ? 'الأسبوع' : p === 'monthly' ? 'الشهر' : 'السنة'}
            </button>
          ))}
        </div>
      </div>

      <SettlementStats statistics={apiData.statistics} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        
        {/* search input*/}
        <div className="lg:col-span-5">
          <MyInput
            type="text" 
            placeholder="بحث برقم التسوية..." 
            Icon={<Search size={18} />} 
          />
        </div>

        {/*date fillter*/}
        <div className="lg:col-span-5 flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
           <div className="flex-1 flex items-center gap-2 px-3">
             <span className="text-[10px] font-bold text-slate-400">من</span>
             <input type="date" className="w-full text-xs font-bold outline-none bg-transparent" />
           </div>
           <div className="hidden sm:block w-[1px] bg-slate-100"></div>
           <div className="flex-1 flex items-center gap-2 px-3">
             <span className="text-[10px] font-bold text-slate-400">إلى</span>
             <input type="date" className="w-full text-xs font-bold outline-none bg-transparent" />
           </div>
           <button className="bg-[#050b1a] text-white p-3 rounded-xl hover:bg-slate-800 transition-colors">
             <Filter size={18} />
           </button>
        </div>

        {/*export button*/}
        <div className="lg:col-span-2">
            <MyButton 
                title={<Download size={18} />} 
                className="w-full flex items-center justify-center gap-2 bg-black text-white py-4 rounded-[24px] hover:bg-slate-800 transition-all"
            />
        </div>
      </div>

      <SettlementItemCard 
        settlementsData={apiData.data} 
        onShow={(item) => { setSelectedData(item); setIsModalOpen(true); }} 
        onDelete={(id) => console.log("حذف", id)} 
      />

      <SettlementDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        data={selectedData} 
      />
    </div>
  );
}

export default Settlements;