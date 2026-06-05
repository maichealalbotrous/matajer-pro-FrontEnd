import React, { useState, useEffect } from 'react';
import { Menu, RefreshCw } from 'lucide-react';
import BranchTable from '../BranchTable/BranchTable';
import RenewDialog from '../BranchesModal/RenewDialog';
import { Dialog, DialogContent } from "@/components/ui/dialog"; 
import { getBranchesServer, deleteBranchServer, toggleBranchStatusServer } from './lib';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';

const BrancheManager = ({ isOpen, setIsOpen }) => {
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); 

  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      const data = await getBranchesServer();
      setBranches(Array.isArray(data) ? data : []);
    } catch (err) {
      setErrorMessage(err.message || "فشل الاتصال بالسيرفر لجلب الفروع.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      setErrorMessage("");
      await toggleBranchStatusServer(id);
      await fetchBranches();
    } catch (err) {
      setErrorMessage(err.message || "فشل تعديل حالة الفرع.");
    }
  };

  // الدالة التي سيتم تمريرها لـ onConfirm داخل واجهتك المخصصة
  const handleDeleteBranch = async () => {
    if (!selectedBranch?.id) return;
    try {
      setErrorMessage("");
      setIsDeleting(true);
      await deleteBranchServer(selectedBranch.id);
      setBranches(prev => prev.filter(b => b.id !== selectedBranch.id));
      setIsDeleteModalOpen(false); 
    } catch (err) {
      setErrorMessage(err.message || "فشلت عملية الحذف من قاعدة البيانات.");
    } finally {
      setIsDeleting(false);
      setSelectedBranch(null);
    }
  };

  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen text-right" dir="rtl">
      {/*Header*/}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-4">
          {!isOpen && (
            <button onClick={() => setIsOpen(true)} className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all">
              <Menu size={20} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black text-slate-900">إدارة الفروع والاشتراكات</h2>
            <button 
              onClick={fetchBranches} 
              disabled={isLoading}
              className={`p-2 text-slate-400 hover:text-[#3198c1] rounded-xl transition-all ${isLoading ? 'animate-spin text-[#3198c1]' : ''}`}
              title="تحديث قائمة الفروع"
            >
              <RefreshCw size={16} />
            </button>
          </div>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 mb-6 bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold rounded-2xl flex items-center gap-2">
          ⚠️ {errorMessage}
        </div>
      )}

      {isLoading ? (
        <div className="space-y-3">
          <div className="h-12 bg-slate-100 rounded-t-[30px] animate-pulse" />
          {Array(3).fill(0).map((_, idx) => (
            <div key={idx} className="h-14 bg-white border-b border-slate-50 animate-pulse last:rounded-b-[30px]" />
          ))}
        </div>
      ) : (
        <BranchTable 
          branches={branches} 
          onToggle={handleToggleStatus}
          onDelete={(branch) => { setSelectedBranch(branch); setIsDeleteModalOpen(true); }} // تهيئة بيانات الفرع المراد حذفه
          onRenew={(b) => { setSelectedBranch(b); setIsRenewModalOpen(true); }}
        />
      )}

      {/* RenewDialog*/}
      <RenewDialog 
        isOpen={isRenewModalOpen}
        onClose={() => { setIsRenewModalOpen(false); setSelectedBranch(null); }}
        branch={selectedBranch}
        onSuccess={fetchBranches}
      />

      {/* DeleteConfirmView */}
      <Dialog open={isDeleteModalOpen} onOpenChange={(open) => { if(!open) setIsDeleteModalOpen(false); }}>
        <DialogContent className="p-0 border-none bg-transparent max-w-sm outline-none shadow-none">
          <DeleteConfirmView
            title="تأكيد حذف الفرع"
            description={`هل أنت متأكد من رغبتك في حذف فرع "${selectedBranch?.name}"؟ تحذير: هذا الإجراء لا يمكن التراجع عنه وسيتم إزالة كافة البيانات المرتبطة بالفرع نهائياً.`}
            onConfirm={handleDeleteBranch}
            onCancel={() => { setIsDeleteModalOpen(false); setSelectedBranch(null); }}
            isDeleting={isDeleting}
            confirmText="نعم، احذف الفرع"
            processingText="جاري الحذف..."
            variant="danger"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BrancheManager;