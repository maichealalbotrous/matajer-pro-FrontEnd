import React, { useEffect, useState } from 'react';
import { Menu, Search } from 'lucide-react'; 
import StatCard from '../StatCard/StatCard';
import SubscriptionGrid from '../SubscriptionKeyCard/SubscriptionKeyCard';
import { getBranchesServer } from '../Branches/BrancheManager/lib';
import { getSubscriptionKeysServer } from '../SubscriptionKeys/SubscriptionKeysManager/lib';

const ProgramerDashboard = ({ isOpen, setIsOpen }) => {
  const [data, setData] = useState([]);
  const [subKey,setsubKey] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setIsLoading(true);
        const response = await getBranchesServer();
        setData(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

    useEffect(() => {
    const fetchSubKey = async () => {
      try {
        setIsLoading(true);
        const response = await getSubscriptionKeysServer();
        setsubKey(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error fetching branches:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubKey();
  }, []);

 
  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen space-y-10" dir="rtl">
      
      <div className="flex items-center gap-4">
        {!isOpen && (
          <button 
            onClick={() => setIsOpen(true)}
            className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Menu size={20} className="text-[#0f172a]" />
          </button>
        )}
        <h2 className="text-xl font-black text-[#0f172a]">لوحة التحكم العامة</h2>
      </div>

      {/*StatCard*/}
      <section>
        <StatCard Data={data} isLoading={isLoading} /> 
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-2">
            <h2 className="text-xl font-black text-[#0f172a]">مفاتيح التراخيص</h2>
            
            {/* بار البحث النظيف الفعال */}
            <div className="relative max-w-xs w-full sm:w-72">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input 
                type="text" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="بحث برقم المفتاح أو الفرع..." 
                className="w-full bg-white border border-slate-100 rounded-2xl pr-11 pl-4 py-2.5 text-xs font-bold outline-none focus:ring-2 focus:ring-[#3198c1] transition-all shadow-sm placeholder-slate-400 text-slate-700" 
              />
            </div>
          </div>
          
          {/* عرض التراخيص المصفاة */}
          <SubscriptionGrid keysData={subKey} />
        </div>
      </div>
    </div>
  );
};

export default ProgramerDashboard;