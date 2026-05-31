import React, { useState, useEffect } from 'react';
import InvoiceStats from '../InvoiceStats/InvoiceStats';
import InvoiceList from '../InvoiceList/InvoiceList';
import InvoiceDetailModal from '../InvoiceDetailModal/InvoiceDetailModal';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { CheckCircle, RotateCcw } from 'lucide-react'; 
import { 
  getInvoicesServer, 
  showInvoiceDetailsServer, 
  approveInvoiceServer, 
  revertInvoiceApprovalServer 
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

  // (Toast)
  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: "", dis: "" });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    invoiceId: null,
    type: "approve", // approve or revert
    isProcessing: false
  });

  const fetchInvoicesData = async () => {
    try {
      setLoading(true);
      const res = await getInvoicesServer();
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
  }, []);

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

  const handleExecuteAction = async () => {
    const { invoiceId, type } = confirmModal;
    try {
      setConfirmModal(prev => ({ ...prev, isProcessing: true }));
      
      if (type === "approve") {
        const res = await approveInvoiceServer(invoiceId);
        setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false });
        triggerToast("تم الاعتماد بنجاح", res?.message || `تم الاعتماد المالي للفاتورة #${invoiceId} وترحيلها بالتسويات.`);
      } else {
        const res = await revertInvoiceApprovalServer(invoiceId);
        setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false });
        triggerToast("تم التراجع بنجاح", res?.message || `أعُيدت الفاتورة #${invoiceId} إلى قائمة الانتظار (العالقة).`);
      }

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

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 relative" dir="rtl">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الفواتير</h1>
          <p className="text-slate-400 font-bold text-sm md:text-base mt-1">
            متابعة واعتماد الفواتير الصادرة من الفروع
          </p>
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
            جاري تحديث الحالات المعتمدة...
          </div>
        )}
        <InvoiceList
          invoices={invoices} 
          onView={handleViewInvoice} 
          onApprove={handleApproveClick} 
          onRevert={handleRevertClick} 
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
              {confirmModal.type === "approve" ? "تأكيد الاعتماد المالي" : "التراجع عن الاعتماد المالي"}
            </DialogTitle>
            <DialogDescription>
              شاشة منبثقة لتأكيد وتوثيق العمليات المالية الحساسة على الفواتير.
            </DialogDescription>
          </div>

          {confirmModal.type === "approve" ? (
            <DeleteConfirmView 
              title="تأكيد الاعتماد المالي"
              description={`هل أنت متأكد من رغبتك في اعتماد الفاتورة رقم #${confirmModal.invoiceId}؟ سيؤدي ذلك إلى حساب صافي الأرباح وترحيلها الفوري لقاعدة البيانات المخصصة.`}
              confirmText="نعم، اعتمد الفاتورة"
              processingText="جاري الاعتماد المالي..."
              variant="success"
              icon={CheckCircle}
              isDeleting={confirmModal.isProcessing}
              onConfirm={handleExecuteAction}
              onCancel={() => setConfirmModal({ isOpen: false, invoiceId: null, type: "approve", isProcessing: false })}
            />
          ) : (
            <DeleteConfirmView 
              title="التراجع عن الاعتماد"
              description={`هل تريد إلغاء الاعتماد المالي للفاتورة رقم #${confirmModal.invoiceId}؟ سيتم حذف قيود الأرباح والتسوية المرتبطة بها وإعادتها كفاتورة عالقة.`}
              confirmText="نعم، ألغِ الاعتماد"
              processingText="جاري سحب الاعتماد..."
              variant="danger"
              icon={RotateCcw}
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