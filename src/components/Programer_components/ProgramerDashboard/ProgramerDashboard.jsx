import React from 'react';
import { Menu } from 'lucide-react'; 
import StatCard from '../StatCard/StatCard';
import SubscriptionGrid from '../SubscriptionKeyCard/SubscriptionKeyCard';
import { defaultKeys } from './lib';

const ProgramerDashboard = ({ isOpen, setIsOpen }) => {
  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen space-y-10" dir="rtl">
      
      <div className="flex items-center gap-4">
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors"
          >
            <Menu size={20} className="text-[#0f172a]" />
          </button>
        )}
        <h2 className="text-xl font-black text-[#0f172a]">لوحة التحكم</h2>
      </div>

      <section>
        <StatCard /> 
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-2xl font-black text-[#0f172a]">مفاتيح الاشتراكات</h2>
            <input 
              type="text" 
              placeholder="بحث عن مفتاح..." 
              className="bg-white border border-slate-100 rounded-2xl px-6 py-2 text-sm outline-none focus:ring-2 focus:ring-[#3198c1]" 
            />
          </div>
          <SubscriptionGrid keysData={defaultKeys} />
        </div>
      </div>
    </div>
  );
};

export default ProgramerDashboard;