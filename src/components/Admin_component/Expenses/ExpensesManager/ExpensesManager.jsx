import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import ExpenseModal from '../ExpenseModal/ExpenseModal';
import Public_Alert from '@/components/Public_Alert/Public_Alert';
import { Dialog, DialogContent } from "@/components/ui/dialog";
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';
import { addExpenseToServer, deleteExpenseFromServer, getExpensesFromServer, updateExpenseOnServer } from './lib';


const ExpensesManager = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalError, setModalError] = useState(null);

  // التحكم بالنوافذ المنبثقة
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [alertConfig, setAlertConfig] = useState({ isVisible: false, title: "", dis: "" });

  const [formData, setFormData] = useState({ type: '', amount: '', notes: '' });
  const isEditMode = !!formData.id;

  const loadExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpensesFromServer();
      setExpenses(data);
      setError(null);
    } catch (err) {
      setError(err.error || "حدث خطأ أثناء تحميل المصاريف من السيرفر.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const triggerAlert = (title, dis) => {
    setAlertConfig({ isVisible: true, title, dis });
    setTimeout(() => setAlertConfig({ isVisible: false, title: "", dis: "" }), 2500);
  };

  const handleOpenAddModal = () => {
    setModalError(null);
    setFormData({ type: '', amount: '', notes: '' }); 
    setIsModalOpen(true);
  };

  const handleEditClick = (expense) => {
    setModalError(null);
    setFormData({ id: expense.id, type: expense.type, amount: expense.amount, notes: expense.notes || '' });
    setIsModalOpen(true); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setModalError(null);

    try {
      if (isEditMode) {
        await updateExpenseOnServer(formData);
        triggerAlert("تم تحديث المصروف", "تم تعديل بيانات المصروف بنجاح داخل النظام.");
      } else {
        await addExpenseToServer(formData);
        triggerAlert("تم تسجيل المصروف", "تم حفظ المصروف التشغيلي بنجاح.");
      }
      setIsModalOpen(false);
      loadExpenses();
    } catch (err) {
      setModalError(err.error || err.message || "فشلت العملية، يرجى التحقق من المدخلات.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleOpenDelete = (id) => {
    setDeleteTargetId(id);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(true);
    try {
      await deleteExpenseFromServer(deleteTargetId);
      triggerAlert("تم حذف المصروف", "تمت إزالة السجل من الحسابات والتقارير المجدولة فوراً.");
      setIsDeleteOpen(false);
      loadExpenses();
    } catch (err) {
      alert(err.message || "فشل حذف المصروف");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6" dir="rtl">
      <Public_Alert isVisible={alertConfig.isVisible} title={alertConfig.title} dis={alertConfig.dis} />

      {/* مودال الحذف الموحد بالثيم الداكن */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md p-8 bg-[#050b1a] border-none text-white rounded-[24px]">
          <DeleteConfirmView 
            title="حذف سجل المصروفات"
            description="هل أنت متأكد من إلغاء هذا المصروف نهائياً؟ سيتم حذفه من ميزانية هذا الشهر."
            onConfirm={handleConfirmDelete}
            onCancel={() => setIsDeleteOpen(false)}
            isDeleting={actionLoading}
          />
        </DialogContent>
      </Dialog>

      {/* الهيدر */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">المصاريف</h1>
          <p className="text-slate-400 font-bold text-sm mt-1">سجل إحصائيات المصاريف التشغيلية للفرع</p>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-[#050b1a] text-white px-6 py-3 rounded-2xl cursor-pointer hover:bg-black transition-all shadow-sm w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          <span className="text-sm font-black">تسجيل مصروف</span>
        </button>
      </div>

      {error ? (
        <div className="p-6 text-center bg-red-50 text-red-600 rounded-[25px] border border-red-100 font-bold">{error}</div>
      ) : (
        <ExpenseTable 
          data={expenses} 
          loading={loading}
          onDelete={handleOpenDelete} 
          onEdit={handleEditClick} 
        />
      )}
      
      <ExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        loading={actionLoading}
        error={modalError}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default ExpensesManager;