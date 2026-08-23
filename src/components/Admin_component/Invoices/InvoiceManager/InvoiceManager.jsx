import React, { useState, useEffect } from 'react';
import InvoiceStats from '../InvoiceStats/InvoiceStats';
import InvoiceList from '../InvoiceList/InvoiceList';
import InvoiceDetailModal from '../InvoiceDetailModal/InvoiceDetailModal';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle, RotateCcw, CheckSquare, Trash2 } from 'lucide-react'; 
import { 
  getInvoicesServer, 
  showInvoiceDetailsServer, 
  approveInvoiceServer, 
  revertInvoiceApprovalServer,
  approveAllInvoicesServer,
  deleteInvoiceServer
} from './lib';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';
import Public_Alert from '@/components/public_Alert/Public_Alert';

function InvoiceManager() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState(null);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 💡 إضافة state للـ period بنفس منطق صفحة التسويات
  const [period, setPeriod] = useState('today'); 

  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: "", dis: "" });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    invoiceId: null,
    type: "approve", 
    isProcessing: false
  });

  const fetchInvoicesData = async () => {
    try {
      setLoading(true);
      // 💡 تمرير الـ period للدالة لفلترة الفواتير حسب الفترة
      const res = await getInvoicesServer(period);
      setInvoices(res.data);
      setStats(res.statistics);
      setError(null);
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء تحميل نظام الفواتير.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoicesData();
  }, [period]); // 💡 إعادة الجلب تلقائياً عند تغيير الفترة

  const triggerToast = (title, dis) => {
    setAlertConfig({ isVisible: true, title, dis });
    setTimeout(() => {
      setAlertConfig({ isVisible: false, title: "", dis: "" });
    }, 3500);
  };

  const handleViewInvoice = async (id) => {
    try {
      const fullDetails = await showInvoiceDetailsServer(id);
      setSelectedInvoice(fullDetails);
      setIsModalOpen(true);
    } catch (err) {
      alert(err.error || "عذراً، فشل جلب تفاصيل هذه الفاتورة من السيرفر.");
    }
  };

  const handleApproveClick = (id) => {
    setConfirmModal({ isOpen: true, invoiceId: id, type: "approve", isProcessing: false });
  };

  const handleRevertClick = (id) => {
    setConfirmModal({ isOpen: true, invoiceId: id, type: "revert", isProcessing: false });
  };

  const handleApproveAllClick = () => {
    setConfirmModal({ isOpen: true, invoiceId: null, type: "approve_all", isProcessing: false });
  };

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, invoiceId: id, type: "delete", isProcessing: false });
  };

  const handleExecuteAction = async () => {
    const { invoiceId, type } = confirmModal;
    try {
      setConfirmModal(prev => ({ ...prev, isProcessing: true }));
      
      if (type === "approve") {
        const res = await approveInvoiceServer(invoiceId);
        triggerToast("تم الاعتماد بنجاح", res?.message || `تم الاعتماد المالي للفاتورة #${invoiceId}.`);
      } else if (type === "approve_all") {
        const res = await approveAllInvoicesServer(period); // 💡 تمرير الـ period الحالي هنا
        triggerToast("تم اعتماد الكل", res?.message || "تم الاعتماد الجماعي لجميع الفواتير بنجاح.");
      }else if (type === "revert") {
        const res = await revertInvoiceApprovalServer(invoiceId);
        triggerToast("تم التراجع بنجاح", res?.message || `أعُيدت الفاتورة #${invoiceId} إلى قائمة الانتظار.`);
      } else if (type === "delete") {
        const res = await deleteInvoiceServer(invoiceId);
        triggerToast("تم الحذف بنجاح", res?.message || `تم حذف الفاتورة #${invoiceId} واسترجاع المخزون.`);
      }

      setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false });
      await fetchInvoicesData();
    } catch (err) {
      setConfirmModal(prev => ({ ...prev, isProcessing: false }));
      const serverErrorMessage = err.error || err.message || "فشلت معالجة الطلب، يرجى المحاولة مرة أخرى.";
      setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false });
      triggerToast("فشل تنفيذ الإجراء", serverErrorMessage);
    }
  };

  if (loading && invoices.length === 0) {
    return (
      <div className="p-8 py-40 text-center font-black text-slate-400 animate-pulse" dir="rtl">
        جاري جلب الفواتير وحساب التقارير المالية للفرع...
      </div>
    );
  }

  const hasPendingInvoices = invoices.some(inv => inv.status === 'pending');

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 relative" dir="rtl">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الفواتير</h1>
          <p className="text-slate-400 font-bold text-sm md:text-base mt-1">
            متابعة واعتماد الفواتير الصادرة من الفروع
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* 💡 أزرار فلترة الفترة بنفس منطق صفحة التسويات */}
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

          <button
            onClick={handleApproveAllClick}
            disabled={!hasPendingInvoices || loading}
            className={`h-11 px-6 rounded-2xl flex items-center gap-2 font-black text-sm transition-all shadow-sm whitespace-nowrap ${
              !hasPendingInvoices 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-[#0f172a] text-white hover:bg-[#1e293b]'
            }`}
          >
            <CheckSquare size={18} />
            اعتماد جميع الفواتير
          </button>
        </div>
      </div>

      {error && (
        <div className="p-4 text-center bg-red-50 text-red-600 rounded-2xl font-bold">{error}</div>
      )}

      <div className="w-full">
        <InvoiceStats stats={stats} />
      </div>

      <div className="w-full relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center font-black text-sm text-slate-500 rounded-[32px]">
            جاري تحديث الحالات...
          </div>
        )}
        <InvoiceList
          invoices={invoices} 
          onView={handleViewInvoice} 
          onApprove={handleApproveClick} 
          onRevert={handleRevertClick} 
          onDelete={handleDeleteClick} 
        />
      </div>

      <InvoiceDetailModal 
        invoice={selectedInvoice} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <Dialog
        open={confirmModal.isOpen} 
        onOpenChange={(open) => !open && setConfirmModal(prev => ({ ...prev, isOpen: false }))}
      >
        <DialogContent className="p-0 border-none bg-transparent max-w-sm outline-none shadow-none" showCloseButton={false}>
          
          <div className="sr-only">
            <DialogTitle>
              {confirmModal.type === "approve" && "تأكيد الاعتماد المالي"}
              {confirmModal.type === "approve_all" && "اعتماد شامل لجميع الفواتير"}
              {confirmModal.type === "revert" && "التراجع عن الاعتماد المالي"}
              {confirmModal.type === "delete" && "تأكيد حذف الفاتورة"}
            </DialogTitle>
            <DialogDescription>شاشة منبثقة لتأكيد العمليات.</DialogDescription>
          </div>

          {confirmModal.type === "approve" ? (
            <DeleteConfirmView 
              title="تأكيد الاعتماد المالي"
              description={`هل أنت متأكد من رغبتك في اعتماد الفاتورة رقم #${confirmModal.invoiceId}؟`}
              confirmText="نعم، اعتمد الفاتورة"
              processingText="جاري الاعتماد المالي..."
              variant="success"
              icon={CheckCircle}
              isDeleting={confirmModal.isProcessing}
              onConfirm={handleExecuteAction}
              onCancel={() => setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false })}
            />
          ) : confirmModal.type === "approve_all" ? (
            <DeleteConfirmView 
              title="اعتماد كافة الفواتير معاً"
              description="هل أنت متأكد من رغبتك في ترحيل واعتماد جميع الفواتير المعلقة دفعة واحدة؟"
              confirmText="نعم، اعتمد كل المعلق"
              processingText="جاري الترحيل الجماعي..."
              variant="success"
              icon={CheckSquare}
              isDeleting={confirmModal.isProcessing}
              onConfirm={handleExecuteAction}
              onCancel={() => setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false })}
            />
          ) : confirmModal.type === "revert" ? (
            <DeleteConfirmView 
              title="التراجع عن الاعتماد"
              description={`هل تريد إلغاء الاعتماد للفاتورة رقم #${confirmModal.invoiceId} وإعادتها كعالقة؟`}
              confirmText="نعم، ألغِ الاعتماد"
              processingText="جاري سحب الاعتماد..."
              variant="danger"
              icon={RotateCcw}
              isDeleting={confirmModal.isProcessing}
              onConfirm={handleExecuteAction}
              onCancel={() => setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false })}
            />
          ) : (
            <DeleteConfirmView 
              title="حذف الفاتورة نهائياً"
              description={`هل أنت متأكد من حذف الفاتورة رقم #${confirmModal.invoiceId}؟ سيتم إرجاع كميات المنتجات إلى المخزون وتحديث البيانات المالية.`}
              confirmText="نعم، احذف الفاتورة"
              processingText="جاري الحذف وضبط المخزون..."
              variant="danger"
              icon={Trash2}
              isDeleting={confirmModal.isProcessing}
              onConfirm={handleExecuteAction}
              onCancel={() => setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false })}
            />
          )}
        </DialogContent>
      </Dialog>

      <Public_Alert 
        isVisible={alertConfig.isVisible} 
        title={alertConfig.title} 
        dis={alertConfig.dis} 
      />
    </div>
  );
}

export default InvoiceManager;