import React from 'react';

import { PieChart, AlertCircle, Calendar } from 'lucide-react';
import TopProfitCard from '../TopProfitCard/TopProfitCard';
import LowStockAlert from '../LowStockAlert/LowStockAlert';

function ReportsManager() {
  // بيانات تجريبية من هيكلة الباك إند الخاص بك
  const topProfitableData = [
    {
      product_name: "hodeis",
      variant_name: "Hodei one",
      color: "kh",
      total_profit: 1780,
      total_sold: 2,
      sizes_performance: [{ size: "m", profit: 1780, qty: "2" }]
    }
  ];

  const lowStockData = [
    // مثال لبيانات المخزون المنخفض
    // { product_name: "hodeis", variant_name: "Hodei one", color: "kh", size: "L", quantity: 1, status: "كمية منخفضة" }
  ];

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
        {/* قسم الأكثر ربحية - يأخذ مساحة أكبر */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="text-blue-500" size={20} />
            <h2 className="text-xl font-black text-[#0f172a]">الأصناف الأكثر ربحية</h2>
          </div>
          <TopProfitCard data={topProfitableData} />
        </div>

        {/* قسم تنبيهات المخزون */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-500" size={20} />
            <h2 className="text-xl font-black text-[#0f172a]">تنبيهات النواقص</h2>
          </div>
          <LowStockAlert items={lowStockData} />
          
          {/* بطاقة إضافية سريعة */}
          <div className="bg-[#050b1a] p-8 rounded-[32px] text-white overflow-hidden relative">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-2">تحسين المبيعات</h3>
              <p className="text-slate-400 text-xs font-bold leading-relaxed">
                بناءً على التقارير، مقاس M في موديل Hodei one هو الأكثر طلباً. ننصح بزيادة المخزون.
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