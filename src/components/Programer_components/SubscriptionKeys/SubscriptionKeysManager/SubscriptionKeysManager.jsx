import React, { useState, useEffect } from 'react';
import { Menu, Plus, RefreshCw } from 'lucide-react';
import KeyTable from '../KeyTable/KeyTable';
import GenerateKeyDialog from '../GenerateKeyDialog/GenerateKeyDialog';
import { getSubscriptionKeysServer, deleteSubscriptionKeyServer } from './lib'; // 🌟 تم استيراد دالة الحذف هنا

const SubscriptionKeysManager = ({ isOpen, setIsOpen }) => {
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // جلب الأكواد عند فتح الشاشة لأول مرة
  useEffect(() => {
    fetchKeys();
  }, []);

  const fetchKeys = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await getSubscriptionKeysServer();
      setKeys(Array.isArray(data) ? data : data?.keys || []);
    } catch (err) {
      setErrorMessage(err.message || "حدث خطأ أثناء جلب الأكواد من قاعدة البيانات.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🌟 دالة معالجة حذف الكود من السيرفر وتحديث الواجهة تلقائياً
  const handleDeleteKey = async (id) => {
    try {
      setErrorMessage("");
      // 1. استدعاء الـ API لحذف العنصر من الخلفية (Laravel)
      await deleteSubscriptionKeyServer(id);
      
      // 2. تحديث الـ State محلياً فوراً ليعكس الحذف بمرونة هندسية متميزة دون الحاجة لإعادة جلب كل البيانات
      setKeys((prevKeys) => prevKeys.filter((keyItem) => keyItem.id !== id));
    } catch (err) {
      setErrorMessage(err.message || "فشلت عملية حذف كود الاشتراك، يرجى المحاولة لاحقاً.");
    }
  };

  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen text-right" dir="rtl">
      {/* الرأس وأزرار التحكم */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-4">
          {!isOpen && (
            <button onClick={() => setIsOpen(true)} className="p-3 bg-white border border-slate-100 rounded-2xl shadow-sm hover:bg-slate-50 transition-all active:scale-95">
              <Menu size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900">أكواد الاشتراكات</h2>
            <button 
              onClick={fetchKeys} 
              disabled={isLoading}
              className={`p-2 text-slate-400 hover:text-[#3198c1] rounded-xl transition-all ${isLoading ? 'animate-spin text-[#3198c1]' : ''}`}
              title="تحديث البيانات"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>

        <button 
          onClick={() => setIsGenerateOpen(true)} 
          className="bg-[#0f172a] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black hover:bg-black transition-all shadow-sm active:scale-95 text-sm"
        >
          <Plus size={18} /> توليد أكواد جديدة
        </button>
      </div>

      {/* عرض الأخطاء إن وجدت */}
      {errorMessage && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-2xl flex items-center gap-2">
          ⚠️ {errorMessage}
        </div>
      )}

      {/* حالة التحميل الأنميشن للهيكل العظمي (Skeleton) */}
      {isLoading ? (
        <div className="space-y-3">
          <div className="h-12 bg-slate-100 rounded-t-[30px] animate-pulse" />
          {Array(4).fill(0).map((_, idx) => (
            <div key={idx} className="h-14 bg-white border-b border-slate-50 animate-pulse last:rounded-b-[30px]" />
          ))}
        </div>
      ) : (
        // 🌟 عرض جدول البيانات الفعلي وتمرير دالة الحذف للمكون التابع
        <KeyTable keys={keys} onDeleteKey={handleDeleteKey} />
      )}

      {/* نافذة التوليد المنبثقة */}
      <GenerateKeyDialog
        isOpen={isGenerateOpen} 
        onClose={() => setIsGenerateOpen(false)} 
        onSuccess={fetchKeys} // إعادة جلب البيانات فور نجاح التوليد
      />
    </div>
  );
};

export default SubscriptionKeysManager;