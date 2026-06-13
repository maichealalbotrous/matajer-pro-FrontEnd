import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Printer, Trash2 } from 'lucide-react';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const KeyTable = ({ keys = [], onDeleteKey }) => {
  // تتبع البيانات الخاصة بالسطر المراد طباعته حالياً في الحاوية المنفصلة
  const [activePrintData, setActivePrintData] = useState(null);
  
  // 🌟 تتبع الـ id الخاص بالمفتاح المراد حذفه لعرض نافذة التأكيد المخصصة
  const [deletingKeyId, setDeletingKeyId] = useState(null);
  const [isDeletingLoading, setIsDeletingLoading] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "غير مححدد";
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', { year: 'numeric', month: '2-digit', day: '2-digit' });
  };

  const getStatusInfo = (item) => {
    if (!item) return { text: '', style: '' };
    const currentDate = new Date();
    const deactivationDate = item.deactivated_at ? new Date(item.deactivated_at) : null;
    
    if (Number(item.is_used) === 1) {
      if (deactivationDate && currentDate > deactivationDate) {
        return { text: 'منتهي الصلاحية', style: 'bg-red-50 text-red-600' };
      }
      return { text: 'نشط / مستخدم', style: 'bg-blue-50 text-blue-600' };
    }
    if (deactivationDate && currentDate > deactivationDate) {
      return { text: 'منتهي الصلاحية', style: 'bg-red-50 text-red-600' };
    }
    return { text: 'متاح', style: 'bg-green-50 text-green-600' };
  };

  const handlePrintRow = (item) => {
    setActivePrintData(item);
    setTimeout(() => {
      window.print();
      setActivePrintData(null);
    }, 150);
  };

  // 🌟 دالة تأكيد الحذف الفعلي عند الضغط على زر الحذف داخل نافذة التنبيه الجديدة
  const handleExecuteDelete = async () => {
    if (!deletingKeyId) return;
    
    setIsDeletingLoading(true);
    try {
      // استدعاء دالة الحذف الممررة من المكون الأب
      await onDeleteKey?.(deletingKeyId);
      // إغلاق النافذة بعد النجاح
      setDeletingKeyId(null);
    } catch (error) {
      console.error("خطأ أثناء الحذف:", error);
    } finally {
      setIsDeletingLoading(false);
    }
  };

  return (
    <div className="w-full relative">
      
      {/* الجدول والواجهة المحصنة */}
      <div className="bg-white rounded-[30px] border border-slate-100 shadow-sm overflow-hidden id-main-table-container" dir="rtl">
        
  
           {/* 🛠️ ستايل هندسة الطباعة المحسّن لإلغاء العناصر الخارجية تماماً */}

           <style>{`

             /* إخفاء حاوية الطباعة تماماً أثناء التصفح الطبيعي */

             .custom-printable-card {

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

               .custom-printable-card,

               .custom-printable-card * {

                 visibility: visible !important;

               }

     

               /* 4. تثبيت الحاوية في أعلى يسار الصفحة تماماً بأبعاد الورقة */

               .custom-printable-card {

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

               .custom-printable-card div {

                 display: flex !important;

                 flex-direction: column !important;

                 align-items: center !important;

                 width: 100% !important;

               }

             }

           `}</style>


        {/* الجدول الفعلي */}
        <Table className="print-hidden">
          <TableHeader className="bg-slate-50 print-hidden">
            <TableRow>
              <TableHead className="text-right font-black text-slate-700">كود الاشتراك</TableHead>
              <TableHead className="text-right font-black text-slate-700">المدة</TableHead>
              <TableHead className="text-right font-black text-slate-700">الحالة</TableHead>
              <TableHead className="text-center font-black text-slate-700 w-28">خيارات</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody className="print-hidden">
            {keys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-slate-400 font-bold">
                  لا توجد أكواد اشتراكات مسجلة حالياً.
                </TableCell>
              </TableRow>
            ) : (
              keys.map((keyItem) => {
                const statusInfo = getStatusInfo(keyItem);
                const formattedKey = keyItem.license_key ? keyItem.license_key.split('-').slice(1).join('-') : '------';

                return (
                  <TableRow key={keyItem.id} className="hover:bg-slate-50/50 transition-colors print-hidden">
                    <TableCell className="font-mono font-black text-slate-800 tracking-wider select-all text-right">
                      {formattedKey}
                    </TableCell>
                    
                    <TableCell className="font-bold text-slate-600 text-right">
                      {keyItem.duration_months} {keyItem.duration_months === 1 ? 'شهر' : 'أشهر'}
                    </TableCell>
                    
                    <TableCell className="text-right">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-black transition-colors ${statusInfo.style}`}>
                        {statusInfo.text}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handlePrintRow(keyItem)}
                          className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all active:scale-95 inline-flex items-center justify-center border border-slate-100 shadow-sm"
                          title="طباعة كود الاشتراك"
                        >
                          <Printer size={15} />
                        </button>

                        {/* 🌟 عند الضغط هنا نقوم فقط بفتح الـ Modal المخصص وتخزين الـ ID */}
                        <button
                          type="button"
                          onClick={() => setDeletingKeyId(keyItem.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all active:scale-95 inline-flex items-center justify-center border border-red-100/50 shadow-sm"
                          title="حذف الكود نهائياً"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        {/* حاوية الطباعة المعزولة */}
        {activePrintData && (
          <div className="custom-printable-card" dir="rtl">
            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'start' }}>
              <span style={{ fontSize: '10px', fontWeight: '900', padding: '4px 12px', borderRadius: '9999px', border: '1px solid #cbd5e1', color: 'black', fontFamily: 'sans-serif' }}>
                {activePrintData.duration_months} {activePrintData.duration_months === 1 ? 'شهر' : 'أشهر'}
              </span>
            </div>

            <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifycontent: 'center' }}>
              <h3 style={{ width: '100%', fontSize: '22px', fontWeight: '900', color: '#0f172a', letterSpacing: '0.05em', fontFamily: 'monospace', backgroundColor: '#f8fafc', padding: '10px 0', borderRadius: '14px', border: '1px solid #e2e8f0', margin: '0' }}>
                {activePrintData.license_key ? activePrintData.license_key.split('-').slice(1).join('-') : activePrintData.license_key}
              </h3>
              <p style={{ fontSize: '9px', fontWeight: '700', color: '#94a3b8', marginTop: '8px', marginBottom: '0', fontFamily: 'sans-serif' }}>تاريخ انتهاء الصلاحية</p>
              <p style={{ fontSize: '11px', fontWeight: '900', color: '#0f172a', marginTop: '2px', marginBottom: '0', fontFamily: 'sans-serif' }}>
                {formatDate(activePrintData.deactivated_at)}
              </p>
            </div>

            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f1f5f9' }}>
              <span style={{ fontSize: '11px', fontWeight: '900', color: '#0f172a', fontFamily: 'sans-serif' }}>
                {getStatusInfo(activePrintData).text}
              </span>
              <span style={{ fontSize: '9px', fontWeight: 'bold', color: '#64748b', fontFamily: 'sans-serif' }}>
                نظام سند
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 🌟 نافذة تأكيد الحذف الاحترافية (تظهر كـ Overlay فوق الجدول عند طلب الحذف) */}
      {deletingKeyId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <DeleteConfirmView
            title="حذف كود الاشتراك"
            description="هل أنت متأكد من رغبتك في حذف كود الاشتراك هذا نهائياً من نظام سند؟ لا يمكن التراجع عن هذه العملية بعد إتمامها."
            confirmText="نعم، احذف الكود"
            processingText="جاري حذف الكود..."
            isDeleting={isDeletingLoading}
            onConfirm={handleExecuteDelete}
            onCancel={() => setDeletingKeyId(null)} // إلغاء الحذف وتصفير المعرف لإغلاق النافذة
          />
        </div>
      )}
    </div>
  );
};

export default KeyTable;