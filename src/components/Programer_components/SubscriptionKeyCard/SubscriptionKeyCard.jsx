import React from 'react';
import { Copy, ShieldCheck, Plus, ShieldAlert } from 'lucide-react';

const SubscriptionGrid = ({ keysData = [] }) => {
  // const [isGenerateOpen, setIsGenerateOpen] = useState(false);


  const data = keysData;

  const statusStyles = {
    "نشط": "text-green-500 bg-green-50",
    "منتهي": "text-red-500 bg-red-50",
    "غير مفعل": "text-slate-400 bg-slate-50"
  };

  const handleCopyKey = (keyText) => {
    if (keyText) {
      navigator.clipboard.writeText(keyText);
    }
  };

  const getKeyStatus = (item) => {
    if (item.is_used === 0) return "غير مفعل";
    
    if (item.deactivated_at) {
      const expiryDate = new Date(item.deactivated_at);
      const today = new Date();
      return expiryDate < today ? "منتهي" : "نشط";
    }
    
    return "نشط";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "غير محدد";
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" dir="rtl">
      {data.map((keyItem, index) => {
        const currentStatus = getKeyStatus(keyItem);

        return (
          <div 
            key={keyItem.id || index} 
            className="bg-white border border-slate-100 p-6 rounded-[40px] relative group hover:border-blue-200 transition-all shadow-sm flex flex-col justify-between"
          >
            <div className="flex justify-between items-start mb-6">
              <button 
                onClick={() => handleCopyKey(keyItem.license_key)}
                className="p-2 text-slate-300 hover:text-[#3198c1] hover:bg-slate-50 rounded-xl transition-all active:scale-95"
                title="نسخ المفتاح"
              >
                <Copy size={18} />
              </button>
              
              <span className="text-[10px] font-black px-3 py-1 rounded-full bg-[#0f172a] text-white">
                {keyItem.duration_months} {keyItem.duration_months === 1 ? 'شهر' : 'أشهر'}
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-black text-[#0f172a] tracking-wider font-mono select-all bg-slate-50/50 py-2 rounded-2xl border border-slate-100/50">
                {keyItem.license_key}
              </h3>
              <p className="text-[10px] font-bold text-slate-300 mt-3">تاريخ انتهاء الصلاحية</p>
              <p className="text-xs font-black text-[#0f172a] mt-0.5">
                {formatDate(keyItem.deactivated_at)}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
              <span className={`text-[11px] font-black px-4 py-1 rounded-xl transition-colors ${statusStyles[currentStatus]}`}>
                {currentStatus}
              </span>
              
              {keyItem.is_used === 1 ? (
                <ShieldCheck size={18} className="text-[#3198c1]" />
              ) : (
                <ShieldAlert size={18} className="text-slate-200" />
              )}
            </div>
          </div>
        );
      })}

      <button   className="border-2 border-dashed border-blue-100 rounded-[40px] flex flex-col items-center justify-center p-10 hover:bg-blue-50/50 transition-all group min-h-[240px]">
        <div className="w-14 h-14 bg-[#3198c1] rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
          <Plus size={30} />
        </div>
        <span className="text-[#3198c1] font-black text-sm">توليد مفاتيح جديدة</span>
      </button>

       {/* نافذة التوليد المنبثقة
      <GenerateKeyDialog
        isOpen={isGenerateOpen} 
        onClose={() => setIsGenerateOpen(false)} 
      /> */}
    </div>
  );
};

export default SubscriptionGrid;