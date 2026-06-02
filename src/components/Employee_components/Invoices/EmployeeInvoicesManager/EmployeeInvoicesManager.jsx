import React, { useEffect, useState } from 'react';
import { FileText, RefreshCw, ArrowLeftRight, Calendar, Hash, ChevronDown, ChevronUp, Plus, Minus, Undo2 } from 'lucide-react';
import { getEmployeeInvoicesServer, returnInvoiceServer } from '../../Products/ProductVariants/lib';
; 
import MyButton from '@/components/MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import Public_Alert from '@/components/public_Alert/Public_Alert';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const EmployeeInvoicesManager = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  
  const [expandedInvoiceId, setExpandedInvoiceId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  
  
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: "",
    description: "",
    confirmText: "",
    variant: "danger",
    icon: null,
    onConfirm: () => {}
  });

  //the quantity of returned Item 
  const [selectedQuantities, setSelectedQuantities] = useState({});

  useEffect(() => {
    fetchEmployeeInvoices();
  }, []);

  const fetchEmployeeInvoices = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const result = await getEmployeeInvoicesServer();
      const fetchedInvoices = result?.data || (Array.isArray(result) ? result : []);
      setInvoices(fetchedInvoices);

      const initialQuantities = {};
      fetchedInvoices.forEach(invoice => {
        initialQuantities[invoice.id] = {};
        invoice.items?.forEach(item => {
          initialQuantities[invoice.id][item.variant_id] = item.quantity;
        });
      });
      setSelectedQuantities(initialQuantities);

    } catch (err) {
      setErrorMessage(err.message || "حدث خطأ أثناء تحميل فواتيرك.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedInvoiceId(expandedInvoiceId === id ? null : id);
  };

  // change the quantity 
  const handleQuantityChange = (invoiceId, variantId, currentMax, type) => {
    setSelectedQuantities(prev => {
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
          [variantId]: newQty
        }
      };
    });
  };

  const getSelectedItemsPayload = (invoice) => {
    const invoiceQtys = selectedQuantities[invoice.id] || {};
    return invoice.items
      .filter(item => (invoiceQtys[item.variant_id] || 0) > 0)
      .map(item => ({
        ...item,
        quantity: invoiceQtys[item.variant_id]
      }));
  };

  // return the selected items with their quantities to the server for processing the return, and then refresh the invoices list to reflect any changes
  const handleReturn = async (invoice) => {
    const itemsToReturn = getSelectedItemsPayload(invoice);
    
    if (itemsToReturn.length === 0) {
      setErrorMessage("يرجى تحديد كمية (قطعة واحدة على الأقل) لأي صنف ترغب في إرجاعه.");
      return;
    }

    // return window.confirm
    setConfirmModal({
      isOpen: true,
      title: "تأكيد عملية الإرجاع المخصصة",
      description: `هل أنت متأكد من رغبتك في إرجاع الأصناف المختارة من الفاتورة رقم #${invoice.id}؟ سيتم إعادة الكميات المحددة مباشرة للمخزن المتاح للموظف بعد التأكيد.`,
      confirmText: "نعم، أكد الإرجاع",
      variant: "danger",
      icon: RefreshCw,
      onConfirm: async () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false })); // إغلاق الديالوج
        setActionLoadingId(invoice.id);
        setErrorMessage("");
        try {
          const payload = {
            original_invoice_id: Number(invoice.id),
            items: itemsToReturn.map(item => ({
              variant_id: Number(item.variant_id),
              quantity: Number(item.quantity)
            }))
          };

          await returnInvoiceServer(payload);
          setAlertMessage(`تم تسجيل الارتجاع المختار من الفاتورة رقم #${invoice.id} بنجاح.`);
          setShowSuccessAlert(true);
          fetchEmployeeInvoices(); 
          setTimeout(() => {
          setShowSuccessAlert(false);
          }, 3000);
        } catch (err) {
          setErrorMessage(err.error || err.message || "فشلت عملية الارتجاع.");
        } finally {
          setActionLoadingId(null);
        }
      }
    });
  };

  // initiate the exchange process by saving the selected items and their quantities in localStorage, then navigate to the CurrentInvoice page where the employee can complete the exchange by selecting new items to replace the returned ones. The actual exchange logic will be handled on the CurrentInvoice page based on the saved session data.
  const handleExchange = (invoice) => {
    const itemsToExchange = getSelectedItemsPayload(invoice);

    if (itemsToExchange.length === 0) {
      setErrorMessage("يرجى تحديد كمية (قطعة واحدة على الأقل) لأي صنف ترغب في استبداله.");
      return;
    }

    // cexchange window.confirm
    setConfirmModal({
      isOpen: true,
      title: "بدء طلب الاستبدال المقاصي",
      description: `هل تريد بدء عملية استبدال للأصناف المختارة من الفاتورة رقم #${invoice.id}؟ سيتم حفظ الأصناف في سلة المرتجعات المؤقتة وتحويلك لشاشة المنتجات لاختيار البدائل الجديدة.`,
      confirmText: "تابع لشاشة المنتجات",
      variant: "success",
      icon: ArrowLeftRight,
      onConfirm: () => {
        setConfirmModal(prev => ({ ...prev, isOpen: false })); // إغلاق الديالوج
        const exchangeSession = {
          original_invoice_id: invoice.id,
          returned_items: itemsToExchange.map(item => ({
            variant_id: item.variant_id,
            variant_name: item.variant_name || item.model_name || `موديل #${item.variant_id}`,
            quantity: item.quantity,
            sold_at_price: parseFloat(item.sold_at_price || 0)
          }))
        };
        
        localStorage.setItem('active_exchange_session', JSON.stringify(exchangeSession));
        navigate('/CurrentInvoice');
      }
    });
  };

  return (
    <div className="p-4 bg-[#fcfcfc] min-h-screen text-right" dir="rtl">
      {/* Public_Alert  */}
      <Public_Alert isVisible={showSuccessAlert} title={alertMessage} dis="تم تحديث قيود المستودع وجدول المبيعات بنجاح." />

      {/* Delete confirm model*/}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
          <DeleteConfirmView 
            title={confirmModal.title}
            description={confirmModal.description}
            confirmText={confirmModal.confirmText}
            variant={confirmModal.variant}
            icon={confirmModal.icon}
            onConfirm={confirmModal.onConfirm}
            onCancel={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
            isDeleting={false}
            processingText="جاري الحفظ..."
          />
        </div>
      )}

      <div className="max-w-6xl mx-auto space-y-4 pt-4">
        {errorMessage && (
          <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-2xl">
            ⚠️ {errorMessage}
          </div>
        )}

        {isLoading ? (
          <div className="space-y-4">
            {Array(3).fill(0).map((_, idx) => (
              <div key={idx} className="h-24 bg-white rounded-[28px] border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : invoices.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-[40px] border border-dashed border-slate-200">
            <FileText size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">لا يوجد فواتير مسجلة باسمك حالياً</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => {
              const isExpanded = expandedInvoiceId === invoice.id;
              const displayAmount = parseFloat(invoice.total_amount || invoice.total || 0);

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
                        <h3 className="font-black text-[#0f172a] text-lg">فاتورة رقم #{invoice.id}</h3>
                        <p className="text-slate-400 font-bold text-xs flex items-center gap-1 mt-1">
                          <Calendar size={12} /> {invoice.created_at || "اليوم"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 self-end sm:self-center">
                      <div className="text-left">
                        <span className="text-2xl font-black text-[#0f172a]">{displayAmount}</span>
                        <span className="text-xs font-black text-[#3198c1] mr-1">ل.س</span>
                      </div>
                      <div className="text-slate-300">
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="bg-slate-50/50 border-t border-slate-50 p-6 space-y-6 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <h4 className="text-xs font-black text-slate-400 mr-2">حدد الكميات المراد إرجاعها أو استبدالها من محتويات الفاتورة:</h4>
                        <div className="bg-white rounded-2xl border border-slate-100 p-4 space-y-3">
                          {invoice.items?.map((item, idx) => {
                            const selectedQty = selectedQuantities[invoice.id]?.[item.variant_id] ?? 0;
                            return (
                              <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 py-2 border-b border-slate-50 last:border-0 text-sm font-bold text-[#0f172a]">
                                <div>
                                  <span>{item.variant_name || `موديل #${item.variant_id}`}</span>
                                  <span className="text-slate-400 text-xs mr-2">(المشترى: {item.quantity} قطع)</span>
                                </div>
                                
                                {/* أزرار التحكم بالكمية الجزئية المحددة للحركة الحالية */}
                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                  <div className="flex items-center gap-2 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100">
                                    <button 
                                      onClick={() => handleQuantityChange(invoice.id, item.variant_id, item.quantity, 'decrement')}
                                      className="p-1 hover:bg-white rounded-lg text-slate-500 transition-all"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center text-sm font-black text-[#0f172a]">{selectedQty}</span>
                                    <button 
                                      onClick={() => handleQuantityChange(invoice.id, item.variant_id, item.quantity, 'increment')}
                                      className="p-1 hover:bg-white rounded-lg text-slate-500 transition-all"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                  <span className="font-black text-left min-w-[80px]">{parseFloat(item.sold_at_price) * (selectedQty || item.quantity)} ل.س</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {invoice.notes && (
                        <p className="text-xs font-bold text-slate-500 bg-amber-500/5 border border-amber-500/10 p-3 rounded-xl">
                          📝 ملاحظة الفاتورة: {invoice.notes}
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 pt-2">
                        <MyButton 
                          title={
                            <div className="flex items-center justify-center gap-2">
                              <RefreshCw size={14} />
                              <span>إرجاع الأصناف المختارة</span>
                            </div>
                          }
                          onClick={() => handleReturn(invoice)}
                          disabled={actionLoadingId === invoice.id}
                          className="flex-1 py-4 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 rounded-2xl text-xs font-black transition-all"
                        />

                        <MyButton 
                          title={
                            <div className="flex items-center justify-center gap-2">
                              <ArrowLeftRight size={14} />
                              <span>استبدال الأصناف المختارة</span>
                            </div>
                          }
                          onClick={() => handleExchange(invoice)}
                          className="flex-1 py-4 bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-100 rounded-2xl text-xs font-black transition-all"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeInvoicesManager;