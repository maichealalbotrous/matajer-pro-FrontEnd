import React, { useState, useEffect } from 'react';
import { UserPlus, RefreshCw } from 'lucide-react';

import { getEmployees, addEmployee, updateEmployee, deleteEmployeeFromServer } from './lib';
import MyButton from '@/components/MyButton/MyButton';
import EmployeeList from '../EmployeeList/EmployeeList';
import EmployeeModal from '../EmployeeModal/EmployeeModal';

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
  const handleDelete = async (id) => {
    if (window.confirm("هل أنت متأكد من رغبتك في حذف هذا الموظف نهائياً من الفرع؟")) {
      try {
        await deleteEmployeeFromServer(id);
        loadEmployees();
      } catch (err) {
        alert(err.message || "فشل حذف الموظف");
      }
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto" dir="rtl">
      
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
          onDelete={handleDelete}
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