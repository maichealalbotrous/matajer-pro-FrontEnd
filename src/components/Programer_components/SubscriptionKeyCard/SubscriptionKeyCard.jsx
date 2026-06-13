import React, { useState } from 'react';
import { Copy, ShieldCheck, Plus, ShieldAlert, Printer } from 'lucide-react';

const SubscriptionGrid = ({ keysData = [] }) => {
  const data = keysData;
  const [activePrintItem, setActivePrintItem] = useState(null);

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

  const handlePrintCard = (item) => {
    setActivePrintItem(item);
    // مهلة زمنية تضمن استقرار الحقن في الـ DOM قبل استدعاء نافذة الطباعة
    setTimeout(() => {
      window.print();
      setActivePrintItem(null);
    }, 150);
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
    <div className="w-full relative">
      
      {/* 🛠️ ستايل هندسة الطباعة المحسّن لإلغاء العناصر الخارجية تماماً */}
      <style>{`
        /* إخفاء حاوية الطباعة تماماً أثناء التصفح الطبيعي */
        .custom-isolated-print-card {
          display: none !important;
        }

        @media print {
          /* 1. تهيئة حجم الورقة المخصص وحذف هوامش المتصفح والرأس/التذييل الافتراضي */
          @page {
            size: 105mm 65mm;
            margin: 0mm !important;
          }
          
          /* 2. إخفاء كل شيء على الإطلاق في الصفحة لتجنب تداخل شريط القوائم أو الفراغات */
          body * {
            visibility: hidden !important;
          }

          /* 3. إظهار كرت الطباعة وعناصره الداخلية فقط وجعلها مرئية */
          .custom-isolated-print-card, 
          .custom-isolated-print-card * {
            visibility: visible !important;
          }

          /* 4. تثبيت الحاوية في أعلى يسار الصفحة تماماً بأبعاد الورقة */
          .custom-isolated-print-card {
            display: flex !important;
            position: fixed !important; /* استخدام fixed بدلاً من absolute لضمان الثبات */
            left: 0 !important;
            top: 0 !important;
            width: 105mm !important;
            height: 65mm !important;
            background-color: white !important;
            padding: 20px !important;
            margin: 0 !important;
            flex-direction: column !important;
            justify-content: center !important; /* توسيط المحتوى عمودياً */
            align-items: center !important;     /* توسيط المحتوى أفقياً */
            box-sizing: border-box !important;
            z-index: 99999999 !important;
            overflow: hidden !important;
          }

          /* ضبط عرض التكست الداخلي للطباعة */
          .custom-isolated-print-card div {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            width: 100% !important;
          }
        }
      `}</style>

      {/* الحاوية المخصصة للشاشة */}
      <div className="main-screen-layout-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full" dir="rtl">
          {data.map((keyItem, index) => {
            const currentStatus = getKeyStatus(keyItem);
            const cardId = keyItem.id || index;

            return (
              <div 
                key={cardId} 
                className="bg-white border border-slate-100 p-6 rounded-[35px] relative shadow-sm flex flex-col justify-between overflow-hidden transition-all"
              >
                {/* الترويسة */}
                <div className="flex justify-between items-start mb-6 w-full">
                  <div className="flex items-center gap-1">
                    <button 
                      type="button"
                      onClick={() => handleCopyKey(keyItem.license_key)}
                      className="p-2 text-slate-300 hover:text-[#3198c1] hover:bg-slate-50 rounded-xl transition-all active:scale-95"
                      title="نسخ المفتاح"
                    >
                      <Copy size={16} />
                    </button>
                    
                    <button 
                      type="button"
                      onClick={() => handlePrintCard(keyItem)}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-95 flex items-center justify-center border border-slate-100 shadow-sm"
                      title="طباعة هذه البطاقة فوراً"
                    >
                      <Printer size={16} />
                    </button>
                  </div>
                  
                  <span className="text-[10px] font-black px-3 py-1 rounded-full bg-[#0f172a] text-white">
                    {keyItem.duration_months} {keyItem.duration_months === 1 ? 'شهر' : 'أشهر'}
                  </span>
                </div>

                {/* الجسد */}
                <div className="text-center mb-6 w-full">
                  <h3 className="text-xl font-black text-[#0f172a] tracking-wider font-mono bg-slate-50/50 py-2.5 rounded-2xl border border-slate-100/50">
                    {keyItem.license_key ? keyItem.license_key.split('-').slice(1).join('-') : '------'}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-300 mt-3">تاريخ انتهاء الصلاحية</p>
                  <p className="text-xs font-black text-[#0f172a] mt-0.5">
                    {formatDate(keyItem.deactivated_at)}
                  </p>
                </div>

                {/* التذييل */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 w-full">
                  <span className={`text-[11px] font-black px-4 py-1 rounded-xl ${statusStyles[currentStatus]}`}>
                    {currentStatus}
                  </span>
                  
                  <div>
                    {keyItem.is_used === 1 ? (
                      <ShieldCheck size={18} className="text-[#3198c1]" />
                    ) : (
                      <ShieldAlert size={18} className="text-slate-200" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* زر توليد المفاتيح */}
          <button className="border-2 border-dashed border-blue-100 rounded-[40px] flex flex-col items-center justify-center p-10 hover:bg-blue-50/50 transition-all group min-h-[240px]">
            <div className="w-14 h-14 bg-[#3198c1] rounded-full flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
              <Plus size={30} />
            </div>
            <span className="text-[#3198c1] font-black text-sm">توليد مفاتيح جديدة</span>
          </button>
        </div>
      </div>

      {/* 🌟 حاوية الطباعة المعزولة كلياً والمحصنة ضد التداخل الخارجي */}
      {activePrintItem && (
        <div className="custom-isolated-print-card" dir="rtl">
          <div>
            {/* كود الاشتراك البارز والموسط */}
            <h3 style={{ width: '100%', textAlign: 'center', fontSize: '26px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em', fontFamily: 'monospace', backgroundColor: '#f8fafc', padding: '12px 0', borderRadius: '16px', border: '1px solid #e2e8f0', margin: '0 0 12px 0' }}>
              {activePrintItem.license_key ? activePrintItem.license_key.split('-').slice(1).join('-') : activePrintItem.license_key}
            </h3>
            
            {/* تاريخ انتهاء الصلاحية المقترن به فقط */}
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textAlign: 'center', fontFamily: 'sans-serif' }}>
              تاريخ انتهاء الصلاحية
            </span>
            <span style={{ fontSize: '14px', fontWeight: '900', color: '#0f172a', marginTop: '4px', textAlign: 'center', fontFamily: 'sans-serif' }}>
              {formatDate(activePrintItem.deactivated_at)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionGrid;