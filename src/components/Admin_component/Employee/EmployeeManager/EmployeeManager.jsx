import React, { useState, useEffect } from 'react';
import { UserPlus, RefreshCw } from 'lucide-react';

import { getEmployees, addEmployee, updateEmployee, deleteEmployeeFromServer } from './lib';
import MyButton from '@/components/MyButton/MyButton';
import EmployeeList from '../EmployeeList/EmployeeList';
import EmployeeModal from '../EmployeeModal/EmployeeModal';
import DeleteConfirmView from '@/components/DeleteConfirmView/DeleteConfirmView';
import { Dialog,DialogContent,DialogTitle,DialogDescription } from "@/components/ui/dialog";

function EmployeeManager() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // loadEmployees
  const loadEmployees = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.message || "فشل تحميل الموظفين");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  // handleSave And Delete
  const handleSave = async (data) => {
    try {
      if (selectedEmployee) {
        await updateEmployee(selectedEmployee.id, data);
      } else {
        await addEmployee(data);
      }
      setIsModalOpen(false);
      loadEmployees();
    } catch (err) {
      alert(err.message || "حدث خطأ أثناء حفظ البيانات");
    }
  };

  // handleDelete
const [deleteModal, setDeleteModal] = useState({
  isOpen: false,
  employeeId: null,
  isProcessing: false
});

// 1. letter time shown state for toast
const [Toast, setToast] = useState({
  isOpen: false,
  title: "",
  description: "",
  type: "success" 
});

const triggerToast = (title, description, type = "success") => {
  setToast({ isOpen: true, title, description, type });
  
  setTimeout(() => {
    setToast(prev => ({ ...prev, isOpen: false }));
  }, 4000);
};

const handleDeleteClick = (id) => {
  setDeleteModal({ isOpen: true, employeeId: id, isProcessing: false });
};
const handleExecuteDelete = async () => {
  const { employeeId } = deleteModal;
  try {
    setDeleteModal(prev => ({ ...prev, isProcessing: true }));
    
    await deleteEmployeeFromServer(employeeId);
    
    setDeleteModal({ isOpen: false, employeeId: null, isProcessing: false });
    
    loadEmployees();
        
  } catch (err) {
    setDeleteModal(prev => ({ ...prev, isProcessing: false }));
    const errorMessage = err.message || err.error || "فشل حذف الموظف، يرجى المحاولة مرة أخرى.";
    
    setDeleteModal({ isOpen: false, employeeId: null, isProcessing: false });

    if (typeof triggerToast === "function") {
      triggerToast("خطأ في العملية", errorMessage);
    } else {
      alert(errorMessage); 
    }
  }
};
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto" dir="rtl">
      
{/* confirm delete dialog*/}
<Dialog
  open={deleteModal.isOpen} 
  onOpenChange={(open) => !open && setDeleteModal(prev => ({ ...prev, isOpen: false }))}
>
  <DialogContent className="p-0 border-none bg-transparent max-w-sm outline-none shadow-none" showCloseButton={false}>
    
    <div className="sr-only">
      <DialogTitle>تأكيد حذف موظف</DialogTitle>
      <DialogDescription>شاشة تأكيد لإزالة الموظف وصلاحياته بشكل نهائي من قاعدة البيانات.</DialogDescription>
    </div>

    <DeleteConfirmView 
      title="حذف الموظف نهائياً"
      description="هل أنت متأكد من رغبتك في حذف هذا الموظف نهائياً من الفرع؟ سيؤدي ذلك إلى سحب كافة صلاحيات الدخول الفورية للمنظومة."
      confirmText="نعم، احذف الموظف"
      processingText="جاري الحذف..."
      variant="danger"
      isDeleting={deleteModal.isProcessing}
      onConfirm={handleExecuteDelete}
      onCancel={() => setDeleteModal({ isOpen: false, employeeId: null, isProcessing: false })}
    />
    
  </DialogContent>
</Dialog>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الموظفين</h1>
          <p className="text-slate-400 font-bold text-sm md:text-base mt-1">
            يمكنك إضافة، تعديل أو حذف موظفي فرعك الحالي
          </p>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button 
            onClick={loadEmployees}
            className="p-3.5 bg-white text-slate-600 rounded-2xl border border-slate-100 shadow-sm hover:bg-slate-50 transition-all active:scale-95"
            title="تحديث القائمة"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          
          <MyButton 
            title="إضافة موظف" 
            icon={<UserPlus size={20} />} 
            onClick={() => { setSelectedEmployee(null); setIsModalOpen(true); }}
            className="bg-[#0f172a] text-white px-6 py-3 md:py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform w-full sm:w-auto justify-center"
          />
        </div>
      </div>

      {/* status*/}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#0f172a]"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12 bg-white rounded-[32px] border border-red-100">
          <p className="text-red-500 font-bold mb-2">{error}</p>
          <button onClick={loadEmployees} className="text-xs text-blue-500 underline font-black">إعادة المحاولة</button>
        </div>
      ) : (
       <EmployeeList
          employees={employees} 
          onEdit={(emp) => { setSelectedEmployee(emp); setIsModalOpen(true); }}
          onDelete={handleDeleteClick} 
        />
      )}

      {/* EmployeeModal*/}
      <EmployeeModal
        isOpen={isModalOpen} 
        employee={selectedEmployee}
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
      />
    </div>
  );
}

export default EmployeeManager;