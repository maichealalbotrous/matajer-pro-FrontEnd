import React, { useState, useEffect } from 'react';
import { Plus, Menu, RefreshCw, SlidersHorizontal } from 'lucide-react';
import PaymentDialog from '../PaymentDialog/PaymentDialog';
import PaymentsTable from '../PaymentsTable/PaymentsTable';
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { destroyPaymentServer, getPaymentsServer } from './lib';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const PaymentsManager = ({ isOpen, setIsOpen }) => {
  // الـ States الأصلية
  const [payments, setPayments] = useState([]);
  const [totalReceived, setTotalReceived] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // نظام الباجينيشن
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  // حالات إدارة مودال الحذف المخصص
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [paymentIdToDelete, setPaymentIdToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // الفلاتر تبدأ فارغة تماماً والـ branch_id فارغ ينتظر إدخال المستخدم يدوياً
  const [filters, setFilters] = useState({ 
    branch_id: '',
    payment_method: '', 
    date_from: '', 
    date_to: '' 
  });

  const [appliedFilters, setAppliedFilters] = useState({ 
    branch_id: '',
    payment_method: '', 
    date_from: '', 
    date_to: '' 
  });

  // دالة جلب البيانات من السيرفر
  const fetchPayments = async (page = 1) => {
    // حماية أساسية: إذا لم يقم المستخدم بكتابة الـ branch_id يدوياً بعد، نوقف التنفيذ فوراً لمنع الـ 422
    if (!appliedFilters.branch_id) {
      setIsLoading(false);
      return; 
    }

    try {
      setIsLoading(true);
      
      // نرسل الـ branch_id المكتوب يدوياً في الفورم مباشرة للسيرفر
      const res = await getPaymentsServer(appliedFilters.branch_id, appliedFilters, page);
      if (res.success) {
        setPayments(res.data.data || []);
        setTotalReceived(res.total_received || 0);
        setPagination({
          current_page: res.data.current_page || 1,
          last_page: res.data.last_page || 1
        });
      }
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // يتم الاستدعاء فقط عندما تتغير الفلاتر المطبقة (عند الضغط على زر الفرز يدوياً)
  useEffect(() => {
    fetchPayments(1);
  }, [appliedFilters]);

  // دالة معالجة زر "تطبيق الفرز" (عندما يضغط المستخدم بيده)
  const handleApplyFilters = (e) => {
    e.preventDefault();
    setAppliedFilters({ ...filters }); // تثبيت وضخ قيم البحث التي كتبها المستخدم يدوياً
  };

  // دالة إفراغ الفلاتر بالكامل
  const handleClearFilters = () => {
    const cleared = { 
      branch_id: '', 
      payment_method: '', 
      date_from: '', 
      date_to: '' 
    };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setPayments([]); // تصفير الجدول المالي لأن الفرع أصبح فارغاً
    setTotalReceived(0);
  };

  // 1. عند الضغط على زر الحذف في الجدول المالي: نفتح المودال المخصص ونخزن الـ id
  const handleDeleteClick = (id) => {
    if (!appliedFilters.branch_id) return alert("يرجى تحديد رقم الفرع أولاً");
    setPaymentIdToDelete(id);
    setIsDeleteModalOpen(true);
  };

  // 2. الدالة الفعلية المربوطة بمكون الـ DeleteConfirmView لتنفيذ الحذف على السيرفر
  const handleConfirmDelete = async () => {
    if (!paymentIdToDelete || !appliedFilters.branch_id) return;
    
    try {
      setIsDeleting(true);
      const res = await destroyPaymentServer(paymentIdToDelete, appliedFilters.branch_id);
      if (res.success) {
        setIsDeleteModalOpen(false); // إغلاق المودال المخصص بعد النجاح
        setPaymentIdToDelete(null);
        fetchPayments(pagination.current_page); // إعادة تحميل الجدول المالي لتحديث البيانات
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      {/* الهيدر العلوي */}
      <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
        <div className="flex items-center gap-4">
          {!isOpen && (
            <button 
              onClick={() => setIsOpen(true)}
              className="p-3 bg-white border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors shadow-sm"
            >
              <Menu size={20} className="text-[#0f172a]" />
            </button>
          )}
          <div>
            <h2 className="text-2xl font-black text-[#0f172a]">المدفوعات والمالية</h2>
            <p className="text-[11px] text-slate-400 font-bold mt-0.5">
              {appliedFilters.branch_id ? `مستعرض بيانات الفرع رقم: #${appliedFilters.branch_id}` : "يرجى إدخال رقم الفرع لبدء العرض"}
            </p>
          </div>
        </div>

        {/* كروت التحكم والإجمالي */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm font-bold text-sm text-[#0f172a]">
            <span>الإجمالي: </span>
            <span className="text-[#3198c1] font-black text-base">{Number(totalReceived).toLocaleString()}</span>
            <span className="text-xs text-slate-400 mr-1">ر.س</span>
          </div>
          
          <button 
            onClick={() => { setCurrentPayment(null); setIsDialogOpen(true); }} 
            className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-bold text-sm transition-all shadow-sm active:scale-95"
          >
            <Plus size={16} /> 
            <span>إضافة دفعة</span>
          </button>
        </div>
      </div>

      {/* بار التصفية والفرع يدوي 100% متوافق كلياً مع الـ Validate */}
      <form onSubmit={handleApplyFilters} className="bg-white p-5 rounded-[26px] border border-slate-100 shadow-sm mb-6 flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-2 text-slate-700 font-black text-sm w-full mb-1">
          <SlidersHorizontal size={16} className="text-[#3198c1]" />
          <span>خيارات فرز وتصفية البيانات المالية</span>
        </div>

        {/* حقل إدخال يدوي إجباري لرقم الفرع داخل فورم التصفية */}
        <div className="w-full sm:w-auto md:w-[140px]">
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">رقم الفرع *</label>
          <MyInput 
            type="number"
            placeholder="أدخل رقم الفرع"
            required
            value={filters.branch_id}
            onChange={e => setFilters({...filters, branch_id: e.target.value})}
            className="w-full px-3 py-2 border rounded-xl outline-none text-sm font-bold"
          />
        </div>
        
        <div className="w-full md:flex-1 min-w-[200px]">
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">طريقة الدفع</label>
          <MyInput 
            type="text"
            placeholder="مثال: مدى، كاش"
            value={filters.payment_method}
            onChange={e => setFilters({...filters, payment_method: e.target.value})}
            className="w-full px-3 py-2 border rounded-xl outline-none text-sm"
          />
        </div>

        <div className="w-full sm:w-auto md:w-[180px]">
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">التاريخ من</label>
          <MyInput 
            type="date"
            value={filters.date_from}
            onChange={e => setFilters({...filters, date_from: e.target.value})}
            className="w-full px-3 py-2 border rounded-xl outline-none text-sm"
          />
        </div>

        <div className="w-full sm:w-auto md:w-[180px]">
          <label className="block text-[11px] font-bold text-slate-400 mb-1.5 mr-1">التاريخ إلى</label>
          <MyInput 
            type="date"
            value={filters.date_to}
            onChange={e => setFilters({...filters, date_to: e.target.value})}
            className="w-full px-3 py-2 border rounded-xl outline-none text-sm"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <MyButton 
            title="تطبيق الفرز"
            type="submit"
            className="bg-[#3198c1] text-white px-5 py-2.5 rounded-xl font-bold text-xs"
          />
          {(appliedFilters.branch_id || appliedFilters.payment_method || appliedFilters.date_from || appliedFilters.date_to) && (
            <button 
              type="button"
              onClick={handleClearFilters}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-xs transition-colors"
            >
              إعادة تعيين
            </button>
          )}
        </div>
      </form>

      {/* جدول البيانات أو رسالة تنبيه لإدخال الرقم */}
      {!appliedFilters.branch_id ? (
        <div className="text-center py-12 text-slate-400 font-bold text-sm bg-white rounded-3xl border border-dashed border-slate-200 shadow-sm">
          ⚠️ يرجى كتابة "رقم الفرع" في حقل التصفية أعلاه ثم الضغط على "تطبيق الفرز" لعرض البيانات المالية.
        </div>
      ) : isLoading ? (
        <div className="flex justify-center items-center py-12 text-slate-400 gap-2">
          <RefreshCw size={20} className="animate-spin" />
          <span className="font-bold text-sm">جاري جلب السجلات المالية للفرع #{appliedFilters.branch_id}...</span>
        </div>
      ) : (
        <>
          <PaymentsTable
            payments={payments}
            onEdit={(p) => { setCurrentPayment(p); setIsDialogOpen(true); }} 
            onDelete={handleDeleteClick} // ربط الجدول بدالة فتح المودال المخصص الجديد
          />

          {/* أزرار التصفح لـ Pagination */}
          {pagination.last_page > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6" dir="ltr">
              <button
                disabled={pagination.current_page === 1}
                onClick={() => fetchPayments(pagination.current_page - 1)}
                className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold shadow-sm disabled:opacity-40 transition-all active:scale-95"
              >
                السابق
              </button>
              <span className="text-xs font-bold text-slate-500 mx-2">
                صفحة {pagination.current_page} من {pagination.last_page}
              </span>
              <button
                disabled={pagination.current_page === pagination.last_page}
                onClick={() => fetchPayments(pagination.current_page + 1)}
                className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold shadow-sm disabled:opacity-40 transition-all active:scale-95"
              >
                التالي
              </button>
            </div>
          )}
        </>
      )}
      
      {/* النافذة المنبثقة للإضافة والتعديل */}
      <PaymentDialog
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)} 
        payment={currentPayment} 
        branchId={appliedFilters.branch_id} 
        onSuccess={() => fetchPayments(pagination.current_page)} 
      />

      {/* مودال الحذف المخصص والفاخر */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
          <DeleteConfirmView
            title="حذف السجل المالي"
            description="هل أنت متأكد من رغبتك في حذف هذا السجل المالي نهائياً؟ لا يمكن التراجع عن هذه العملية لاحقاً."
            confirmText="نعم، احذف السجل"
            processingText="جاري حذف السجل..."
            isDeleting={isDeleting}
            onConfirm={handleConfirmDelete}
            onCancel={() => { setIsDeleteModalOpen(false); setPaymentIdToDelete(null); }}
          />
        </div>
      )}
    </div>
  );
};

export default PaymentsManager;