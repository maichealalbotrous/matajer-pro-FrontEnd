import React, { useState, useEffect } from 'react';
import { PieChart, AlertCircle, Calendar, ArrowUpRight } from 'lucide-react';
import TopProfitCard from '../TopProfitCard/TopProfitCard';
import LowStockAlert from '../LowStockAlert/LowStockAlert';
import { getTopProfitableServer, getLowStockAlertsServer } from './lib';

function ReportsManager() {
  const [topProfitableData, setTopProfitableData] = useState([]);
  const [lowStockData, setLowStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        const [profitableRes, lowStockRes] = await Promise.all([
          getTopProfitableServer(),
          getLowStockAlertsServer()
        ]);

        setTopProfitableData(profitableRes);
        setLowStockData(lowStockRes);
      } catch (err) {
        setError(err.message || "حدث خطأ أثناء تحميل البيانات التحليلية.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10 py-40 text-center font-black text-slate-400 animate-pulse" dir="rtl">
        جاري تحليل البيانات المالية واستخراج تقارير الأداء والمخزون...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-10 max-w-7xl mx-auto" dir="rtl">
        <div className="p-6 text-center bg-red-50 text-red-600 rounded-[24px] font-bold">{error}</div>
      </div>
    );
  }

  const topProduct = topProfitableData[0];
  const topSize = topProduct?.sizes_performance?.[0];

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto space-y-10" dir="rtl">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a]">التقارير التحليلية</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">نظرة عامة على الأداء المالي والمخزون</p>
        </div>
        <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-2xl border border-slate-100 text-xs font-black text-[#0f172a] shadow-sm">
          <Calendar size={16} /> آخر 30 يوم
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Top profits*/}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="text-blue-500" size={20} />
            <h2 className="text-xl font-black text-[#0f172a]">الأصناف الأكثر ربحية</h2>
          </div>
          <TopProfitCard data={topProfitableData} />
        </div>

        {/* Low stock alerts */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <h2 className="text-xl font-black text-[#0f172a]">تنبيهات النواقص</h2>
          </div>
          <LowStockAlert items={lowStockData} />
          
          {/* system recommendation for the most profitable products */}
          <div className="bg-[#050b1a] p-8 rounded-[32px] text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">تحسين المبيعات</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">
                {topProduct && topSize ? (
                  <>
                    بناءً على التقارير، مقاس <strong className="text-green-400 font-black">{topSize.size}</strong> في موديل <strong className="text-white font-black">{topProduct.variant_name}</strong> هو الأكثر طلباً وتحقيقاً للأرباح. ننصح بزيادة المخزون وتأمين الكميات منه لتغطية السوق .
                  </>
                ) : (
                  "لم يتم رصد حركات مبيعات كافية لبناء التوصيات المخصصة للمخازن بعد."
                )}
              </p>
            </div>
            <ArrowUpRight className="absolute -bottom-4 -left-4 text-white/10 w-24 h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsManager;