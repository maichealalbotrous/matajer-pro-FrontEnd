import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react'; 
import StatCard from '../StatCard/StatCard';
import SubscriptionGrid from '../SubscriptionKeyCard/SubscriptionKeyCard';
import { getBranchesServer } from '../Branches/BrancheManager/lib';
import { getSubscriptionKeysServer } from '../SubscriptionKeys/SubscriptionKeysManager/lib';

// استقبال الـ Props الممررة من الـ Layout بشكل تقليدي ومستقر
const ProgramerDashboard = () => {
  const [data, setData] = useState([]);
  const [subKey, setsubKey] = useState([]);
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
        console.error('Error fetching subkeys:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubKey();
  }, []);

  // تصفية مفاتيح التراخيص بناءً على نص البحث
  const filteredKeys = subKey.filter((keyItem) => {
    const term = searchTerm.toLowerCase();
    const keyMatch = keyItem.license_key?.toLowerCase().includes(term);
    const branchMatch = keyItem.branch_name?.toLowerCase().includes(term);
    return keyMatch || branchMatch;
  });

  return (
    // تم تغيير الـ padding التمريري في الموبايل ليتناسق مع وجود الهيدر (p-4 md:p-8)
    <div className="p-4 md:p-8 bg-[#fcfcfc] min-h-screen space-y-10" dir="rtl">
      
      {/* 🌟 رأس الصفحة النظيف والموحد بدون أزرار همبرغر زائدة */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-black text-[#0f172a]">لوحة التحكم العامة</h2>
      </div>

      {/* أقسام الإحصائيات الذكية */}
      <section>
        <StatCard Data={data} isLoading={isLoading} /> 
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 px-2">
            <h2 className="text-xl font-black text-[#0f172a]">مفاتيح التراخيص</h2>
            
            {/* بار البحث الفعال وعالي الدقة */}
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
          
          {/* عرض التراخيص المصفاة لتفعيل خاصية البحث الفوري */}
          <SubscriptionGrid keysData={filteredKeys} />
        </div>
      </div>
    </div>
  );
};

export default ProgramerDashboard;