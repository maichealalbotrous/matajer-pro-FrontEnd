import React, { useState, useEffect, useCallback } from 'react';
import { Filter } from 'lucide-react';
import SettlementItemCard from '../SettlementItemCard/SettlementItemCard';
import SettlementDetailModal from '../SettlementDetailModal/SettlementDetailModal';
import SettlementStats from '../SettlementStats/SettlementStats';
import MyButton from '@/components/MyButton/MyButton';
import Public_Alert from '@/components/Public_Alert/Public_Alert';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';
import { deleteSettlementFromServer, getFinancialReportsFromServer, getSettlementsFromServer } from './lib';

function Settlements() {
  const [period, setPeriod] = useState('monthly'); 
  const [customDates, setCustomDates] = useState({ from: '', to: '' });
  
  // معطل وموضوع في كومنت بناءً على رغبتك
  // const [searchId, setSearchId] = useState('');
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);

  // النوافذ المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: "", dis: "" });

  const [apiData, setApiData] = useState({
    statistics: { settlements_count: 0, total_gross_revenue: 0, total_expenses: 0, total_net_profit: 0 },
    data: []
  });

  const triggerAlert = (title, dis) => {
    setAlertConfig({ isVisible: true, title, dis });
    setTimeout(() => setAlertConfig({ isVisible: false, title: "", dis: "" }), 2500);
  };

  // 1. جلب البيانات بناءً على الأزرار الزمنية السريعة (Reports Endpoint)
  const fetchReportData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getFinancialReportsFromServer(period);
      
      if (res.success) {
        setApiData({
          statistics: {
            settlements_count: res.summary.total_invoices,
            total_gross_revenue: res.summary.gross_revenue,
            total_expenses: res.summary.total_expenses,
            total_net_profit: res.summary.net_profit
          },
          data: [] 
        });
        
        const indexRes = await getSettlementsFromServer();
        if (indexRes.success) {
          setApiData(prev => ({ ...prev, data: indexRes.data }));
        }
      }
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء مزامنة التقارير.");
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    fetchReportData();
  }, [fetchReportData]);

  // 2. فلترة مخصصة باستخدام تاريخ (من / إلى) عبر دالة index
  const handleCustomDateFilter = async () => {
    if (!customDates.from || !customDates.to) {
      alert("الرجاء اختيار تاريخ البدء وتاريخ الانتهاء أولاً");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const res = await getSettlementsFromServer(customDates.from, customDates.to);
      if (res.success) {
        setApiData({
          statistics: res.statistics,
          data: res.data
        });
      }
    } catch (err) {
      setError(err.message || "فشلت فلترة البيانات المخصصة.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteSettlementFromServer(deleteTargetId);
      triggerAlert("تم حذف التسوية", "تمت إزالة القيود والبيانات المالية المرتبطة من السيرفر.");
      setIsDeleteOpen(false);
      fetchReportData();
    } catch (err) {
      alert(err.message || "فشل إتمام عملية الحذف");
    } finally {
      setActionLoading(false);
    }
  };

  // تم إصلاح المتغير هنا ليمرر البيانات مباشرة بدون فلترة البحث المعطلة لتجنب خطأ الـ ReferenceError
  const filteredSettlements = apiData.data;

  return (
    <div className="p-4 md:p-8 lg:p-10 max-w-7xl mx-auto space-y-6" dir="rtl">
      <Public_Alert isVisible={alertConfig.isVisible} title={alertConfig.title} dis={alertConfig.dis} />

      {/* نافذة تأكيد الحذف */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-8 bg-[#050b1a] border-none text-white rounded-[24px]">
          <DeleteConfirmView 
            title="حذف القيد المالي"
            description="هل أنت متأكد من حذف هذه التسوية المالية نهائياً؟ هذا الإجراء قد يغير حسابات الأرباح والخسائر للفرع."
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteOpen(false)}
            isDeleting={actionLoading}
          />
        </DialogContent>
      </Dialog>

      {/* الهيدر وفلاتر الفترات */}
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
                ${period === p ? 'bg-black text-white shadow-md' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              {p === 'today' ? 'اليوم' : p === 'weekly' ? 'الأسبوع' : p === 'monthly' ? 'الشهر' : 'السنة'}
            </button>
          ))}
        </div>
      </div>

      <SettlementStats statistics={apiData.statistics} />

      {/* أدوات الفلترة الزمنية المخصصة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
        {/* حقل البحث برقم التسوية معطل وموضوع بكومنت بناءً على طلبك */}
        {/* <div className="lg:col-span-5">
          <MyInput
            type="text" 
            placeholder="بحث برقم التسوية..." 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            Icon={<Search size={18} />} 
          />
        </div> */}

        <div className="lg:col-span-12 flex flex-col sm:flex-row gap-2 bg-white p-2 rounded-[24px] border border-slate-100 shadow-sm">
           <div className="flex-1 flex items-center gap-2 px-3">
             <span className="text-[10px] font-bold text-slate-400">من</span>
             <input 
               type="date" 
               className="w-full text-xs font-bold outline-none bg-transparent" 
               value={customDates.from}
               onChange={(e) => setCustomDates({...customDates, from: e.target.value})}
             />
           </div>
           <div className="hidden sm:block w-[1px] bg-slate-100"></div>
           <div className="flex-1 flex items-center gap-2 px-3">
             <span className="text-[10px] font-bold text-slate-400">إلى</span>
             <input 
               type="date" 
               className="w-full text-xs font-bold outline-none bg-transparent" 
               value={customDates.to}
               onChange={(e) => setCustomDates({...customDates, to: e.target.value})}
             />
           </div>
           <button 
             onClick={handleCustomDateFilter}
             className="bg-[#050b1a] text-white p-3 rounded-xl hover:bg-slate-800 transition-colors"
           >
             <Filter size={18} />
           </button>
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center font-black text-slate-400 animate-pulse">جاري تحميل التقارير المالية المتزامنة...</div>
      ) : error ? (
        <div className="p-6 text-center bg-red-50 text-red-600 rounded-[24px] font-bold">{error}</div>
      ) : (
        <SettlementItemCard 
          settlementsData={filteredSettlements} 
          onShow={(item) => { setSelectedId(item.id); setIsModalOpen(true); }} 
          onDelete={handleOpenDelete} 
        />
      )}

      {isModalOpen && (
        <SettlementDetailModal 
          isOpen={isModalOpen} 
          onClose={() => { setIsModalOpen(false); setSelectedId(null); }} 
          settlementId={selectedId} 
        />
      )}
    </div>
  );
}

export default Settlements;