import React, { useEffect, useState } from 'react';
import {
  FileText,
  RefreshCw,
  ArrowLeftRight,
  Calendar,
  Hash,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import {
  getEmployeeInvoicesServer,
  returnInvoiceServer,
} from '../../Products/ProductVariants/lib';
import MyButton from '@/components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import Public_Alert from '@/components/public_Alert/Public_Alert';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const EmployeeInvoicesManager = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // 💡 تحديد التبويب الحالي: 'today' لفواتير اليوم، و 'week' لفواتير الأسبوع
  const [activeTab, setActiveTab] = useState('today');

  // 💡 حالات الترقيم والتحكم بالصفحات
  const [currentPage, setCurrentPage] = useState(1);
  const INVOICES_PER_PAGE = 3; // عدد الفواتير في الصفحة الواحدة

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmText: '',
    variant: 'danger',
    icon: null,
    onConfirm: () => {},
  });

  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    fetchEmployeeInvoices();
  }, []);

  // عند تغيير التبويب، نعود تلقائياً للصفحة الأولى ونغلق الفواتير المفتوحة
  useEffect(() => {
    setCurrentPage(1);
    setExpandedInvoiceId(null);
  }, [activeTab]);

  const fetchEmployeeInvoices = async () => {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const result = await getEmployeeInvoicesServer();
      const fetchedInvoices =
        result?.data || (Array.isArray(result) ? result : []);
      setInvoices(fetchedInvoices);

      // تهيئة عدادات الكميات الافتراضية للفواتير
      const initialQuantities = {};
      fetchedInvoices.forEach((invoice) => {
        initialQuantities[invoice.id] = {};
        invoice.items?.forEach((item) => {
          initialQuantities[invoice.id][item.variant_id] = item.quantity;
        });
      });
      setSelectedQuantities(initialQuantities);
    } catch (err) {
      setErrorMessage(err.message || 'حدث خطأ أثناء تحميل فواتيرك.');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedInvoiceId(expandedInvoiceId === id ? null : id);
  };

  const handleQuantityChange = (invoiceId, variantId, currentMax, type) => {
    setSelectedQuantities((prev) => {
      const currentQty = prev[invoiceId]?.[variantId] ?? 0;
      let newQty = currentQty;

      if (type === 'increment' && currentQty < currentMax) {
        newQty = currentQty + 1;
      } else if (type === 'decrement' && currentQty > 0) {
        newQty = currentQty - 1;
      }

      return {
        ...prev,
        [invoiceId]: {
          ...prev[invoiceId],
          [variantId]: newQty,
        },
      };
    });
  };

  const getSelectedItemsPayload = (invoice) => {
    const invoiceQtys = selectedQuantities[invoice.id] || {};
    return invoice.items
      .filter((item) => (invoiceQtys[item.variant_id] || 0) > 0)
      .map((item) => ({
        ...item,
        quantity: invoiceQtys[item.variant_id],
      }));
  };

  const handleReturn = async (invoice) => {
    const itemsToReturn = getSelectedItemsPayload(invoice);

    if (itemsToReturn.length === 0) {
      setErrorMessage(
        'يرجى تحديد كمية (قطعة واحدة على الأقل) لأي صنف ترغب في إرجاعه.'
      );
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'تأكيد عملية الإرجاع المخصصة',
      description: `هل أنت متأكد من رغبتك في إرجاع الأصناف المختارة من الفاتورة رقم #${invoice.id}؟ سيتم إعادة الكميات المحددة مباشرة للمخزن المتاح للموظف بعد التأكيد.`,
      confirmText: 'نعم، أكد الإرجاع',
      variant: 'danger',
      icon: RefreshCw,
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        setActionLoadingId(invoice.id);
        setErrorMessage('');
        try {
          const payload = {
            original_invoice_id: Number(invoice.id),
            items: itemsToReturn.map((item) => ({
              variant_id: Number(item.variant_id),
              quantity: Number(item.quantity),
            })),
          };

          await returnInvoiceServer(payload);
          setAlertMessage(
            `تم تسجيل الارتجاع المختار من الفاتورة رقم #${invoice.id} بنجاح.`
          );
          setShowSuccessAlert(true);
          fetchEmployeeInvoices();
          setTimeout(() => {
            setShowSuccessAlert(false);
          }, 3000);
        } catch (err) {
          setErrorMessage(err.error || err.message || 'فشلت عملية الارتجاع.');
        } finally {
          setActionLoadingId(null);
        }
      },
    });
  };

  const handleExchange = (invoice) => {
    const itemsToExchange = getSelectedItemsPayload(invoice);

    if (itemsToExchange.length === 0) {
      setErrorMessage(
        'يرجى تحديد كمية (قطعة واحدة على الأقل) لأي صنف ترغب في استبداله.'
      );
      return;
    }

    setConfirmModal({
      isOpen: true,
      title: 'بدء طلب الاستبدال المقاصي',
      description: `هل تريد بدء عملية استبدال للأصناف المختارة من الفاتورة رقم #${invoice.id}؟ سيتم حفظ الأصناف في سلة المرتجعات المؤقتة وتحويلك لشاشة المنتجات لاختيار البدائل الجديدة.`,
      confirmText: 'تابع لشاشة المنتجات',
      variant: 'success',
      icon: ArrowLeftRight,
      onConfirm: () => {
        setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        const exchangeSession = {
          original_invoice_id: invoice.id,
          returned_items: itemsToExchange.map((item) => ({
            variant_id: item.variant_id,
            variant_name:
              item.variant_name ||
              item.model_name ||
              `موديل #${item.variant_id}`,
            quantity: item.quantity,
            sold_at_price: parseFloat(item.sold_at_price || 0),
          })),
        };

        localStorage.setItem(
          'active_exchange_session',
          JSON.stringify(exchangeSession)
        );
        navigate('/CurrentInvoice');
      },
    });
  };

  // 💡 دالة فرز وتصفية الفواتير زمنياً بناءً على حقل الـ created_at
  const filteredInvoices = invoices.filter((invoice) => {
    if (!invoice.created_at) return true; // احتياطاً إذا كان الحقل فارغاً

    const invoiceDate = new Date(invoice.created_at);
    const today = new Date();

    // حساب الفارق الفعلي بالأيام
    const diffTime = Math.abs(today - invoiceDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (activeTab === 'today') {
      // إما في نفس اليوم تاريخياً أو الفارق أقل من يوم واحد
      return (
        diffDays <= 1 || invoiceDate.toDateString() === today.toDateString()
      );
    } else if (activeTab === 'week') {
      // الفواتير التي تمت خلال آخر 7 أيام
      return diffDays <= 7;
    }
    return true;
  });

  // 💡 حسابات الترقيم وتحديد مصفوفة الفواتير المعروضة بالصفحة الحالية فقط
  const indexOfLastInvoice = currentPage * INVOICES_PER_PAGE;
  const indexOfFirstInvoice = indexOfLastInvoice - INVOICES_PER_PAGE;
  const currentInvoicesSlice = filteredInvoices.slice(
    indexOfFirstInvoice,
    indexOfLastInvoice
  );
  const totalPages = Math.ceil(filteredInvoices.length / INVOICES_PER_PAGE);

  return (
    <div className="p-10 bg-[#fcfcfc] min-h-screen text-right" dir="rtl">
      <Public_Alert
        isVisible={showSuccessAlert}
        title={alertMessage}
        dis="تم تحديث قيود المستودع وجدول المبيعات بنجاح."
      />

      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <DeleteConfirmView
            title={confirmModal.title}
            description={confirmModal.description}
            confirmText={confirmModal.confirmText}
            variant={confirmModal.variant}
            icon={confirmModal.icon}
            onConfirm={confirmModal.onConfirm}
            onCancel={() =>
              setConfirmModal((prev) => ({ ...prev, isOpen: false }))
            }
            isDeleting={false}
            processingText="جاري الحفظ..."
          />
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6 pt-2">
        {/* العناوين والتبويبات الفاخرة */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
          <div>
            <h1 className="text-2xl font-black text-[#0f172a]">
              إدارة عمليات المرتجعات والمقاصة
            </h1>
            <p className="text-slate-400 font-bold text-xs mt-1">
              تتبع مبيعاتك اليومية والأسبوعية وإدارتها بكفاءة
            </p>
          </div>

          {/* 💡 أزرار التبديل الدائرية (Tabs) */}
          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-fit self-start">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'today' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              فواتير اليوم
            </button>
            <button
              onClick={() => setActiveTab('week')}
              className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${activeTab === 'week' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              فواتير الأسبوع الحالي
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-2xl animate-in fade-in">
            ⚠️ {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, idx) => (
                <div
                  key={idx}
                  className="h-28 bg-white rounded-[32px] border border-slate-100 animate-pulse"
                />
              ))}
          </div>
        ) : currentInvoicesSlice.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
            <FileText size={44} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold text-sm">
              لا توجد فواتير معروضة في هذا النطاق حالياً
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {currentInvoicesSlice.map((invoice) => {
              const isExpanded = expandedInvoiceId === invoice.id;
              const displayAmount = parseFloat(
                invoice.total_amount || invoice.total || 0
              );

              return (
                <div
                  key={invoice.id}
                  className={`bg-white border transition-all duration-300 rounded-[32px] overflow-hidden shadow-sm
                    ${isExpanded ? 'border-[#3198c1] ring-4 ring-blue-500/5' : 'border-slate-100 hover:border-slate-200'}`}
                >
                  <div
                    onClick={() => toggleExpand(invoice.id)}
                    className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-[#3198c1]">
                        <Hash size={18} />
                      </div>
                      <div>
                        <h3 className="font-black text-[#0f172a] text-base">
                          فاتورة رقم #{invoice.id}
                        </h3>
                        <p className="text-slate-400 font-bold text-[11px] flex items-center gap-1 mt-1">
                          <Calendar size={12} /> {invoice.created_at || 'اليوم'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 self-end sm:self-center">
                      <div className="text-left">
                        <span className="text-xl font-black text-[#0f172a]">
                          {displayAmount.toLocaleString()}
                        </span>
                        <span className="text-xs font-black text-[#3198c1] mr-1">
                          ل.س
                        </span>
                      </div>
                      <div className="text-slate-300">
                        {isExpanded ? (
                          <ChevronUp size={18} />
                        ) : (
                          <ChevronDown size={18} />
                        )}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-50/50 border-t border-slate-100 p-4 sm:p-6 space-y-5 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <h4 className="text-xs font-black text-slate-400 mr-1">
                          حدد الكميات المراد إرجاعها أو استبدالها من محتويات
                          الفاتورة:
                        </h4>

                        <div className="bg-white rounded-2xl border border-slate-100 p-3 sm:p-4 space-y-3 shadow-sm">
                          {invoice.items?.map((item, idx) => {
                            const selectedQty =
                              selectedQuantities[invoice.id]?.[
                                item.variant_id
                              ] ?? 0;
                            return (
                              <div
                                key={idx}
                                className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 py-3.5 border-b border-slate-100 last:border-0 text-xs font-bold text-[#0f172a]"
                              >
                                {/* تفاصيل الصنف مع كسر الكلمات التلقائي والالتفاف الموزون */}
                                <div className="flex flex-col gap-1 text-right max-w-full md:max-w-[60%]">
                                  <span className="font-black text-slate-700 block whitespace-normal break-words leading-relaxed">
                                    {item.variant_name}
                                  </span>
                                  <span className="text-slate-400 text-[10px] inline-block font-medium">
                                    (الكمية المشتراة: {item.quantity} قطع)
                                  </span>
                                </div>

                                {/* أداة التحكم بالعداد المالي المتجاوبة */}
                                <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t border-dashed border-slate-50 pt-2 md:pt-0 md:border-0">
                                  <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100/80">
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          invoice.id,
                                          item.variant_id,
                                          item.quantity,
                                          'decrement'
                                        )
                                      }
                                      className="p-1.5 hover:bg-white rounded-lg text-slate-500 transition-all hover:shadow-sm active:scale-95"
                                    >
                                      <Minus size={12} />
                                    </button>
                                    <span className="w-8 text-center text-xs font-black text-[#0f172a] font-mono">
                                      {selectedQty}
                                    </span>
                                    <button
                                      onClick={() =>
                                        handleQuantityChange(
                                          invoice.id,
                                          item.variant_id,
                                          item.quantity,
                                          'increment'
                                        )
                                      }
                                      className="p-1.5 hover:bg-white rounded-lg text-slate-500 transition-all hover:shadow-sm active:scale-95"
                                    >
                                      <Plus size={12} />
                                    </button>
                                  </div>

                                  {/* السعر التفصيلي المنعكس */}
                                  <span className="font-black text-left md:min-w-[100px] text-slate-600 font-mono text-xs sm:text-sm">
                                    {(
                                      parseFloat(item.sold_at_price) *
                                      selectedQty
                                    ).toLocaleString()}{' '}
                                    ل.س
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* ملاحظات الفاتورة إن وجدت */}
                      {invoice.type === 'return' || invoice.type === 'sale' ? (
                        <p className="text-xs font-bold text-slate-500 bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-xl leading-relaxed text-right">
                         
                          📝 ملاحظة الفاتورة: {invoice.notes}
                        </p>
                      ):  <p className="text-xs font-bold text-slate-500 bg-amber-500/5 border border-amber-500/10 p-3.5 rounded-xl leading-relaxed text-right">
                         
                          📝 ملاحظة الفاتورة: فاتورة ابدال من  {invoice.notes}
                        </p>}

                      {/* أزرار اتخاذ القرار المتجاوبة (عمودية على الموبايل، أفقية على الشاشات الأكبر) */}
                      {/* 💡 التحقق الشامل من كون الفاتورة إرجاع */}
                      {!(invoice.type === 'return') ? (
                        <div className="flex flex-col sm:flex-row gap-3 pt-1 w-full">
                          <MyButton
                            title={
                              <div className="flex items-center justify-center gap-2">
                                <RefreshCw size={14} />
                                <span>إرجاع الأصناف المختارة</span>
                              </div>
                            }
                            onClick={() => handleReturn(invoice)}
                            disabled={actionLoadingId === invoice.id}
                            className="w-full sm:flex-1 py-4 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100/70 rounded-2xl text-xs font-black transition-all active:scale-[0.99] justify-center"
                          />

                          <MyButton
                            title={
                              <div className="flex items-center justify-center gap-2">
                                <ArrowLeftRight size={14} />
                                <span>استبدال الأصناف المختارة</span>
                              </div>
                            }
                            onClick={() => handleExchange(invoice)}
                            className="w-full sm:flex-1 py-4 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100/70 rounded-2xl text-xs font-black transition-all active:scale-[0.99] justify-center"
                          />
                        </div>
                      ) : (
                        <div className="p-3.5 bg-slate-100/80 rounded-2xl text-center">
                          <p className="text-xs font-bold text-slate-500">
                            ℹ️ هذه الفاتورة عبارة عن سجل إرجاع مسبق ولا يمكن
                            إجراء عمليات إرجاع أو استبدال عليها.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 💡 بار الترقيم (Pagination) السفلي المتراص والمحاذى بشكل فاخر */}
        {!isLoading && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6 border-t border-slate-100 select-none">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={16} />
            </button>

            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
              {Array.from({ length: totalPages }).map((_, pageIdx) => {
                const pageNumber = pageIdx + 1;
                const isSelected = currentPage === pageNumber;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-9 h-9 text-xs font-black rounded-lg transition-all ${
                      isSelected
                        ? 'bg-[#3198c1] text-white shadow-sm shadow-[#3198c1]/25'
                        : 'text-slate-500 hover:bg-white hover:text-[#0f172a]'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeInvoicesManager;
