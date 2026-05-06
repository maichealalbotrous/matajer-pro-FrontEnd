import React, { useState } from 'react';
import { UserPlus } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import EmployeeList from '../EmployeeList/EmployeeList';
import EmployeeModal from '../EmployeeModal/EmployeeModal';

function EmployeeManager() {
  const [employees, SetEmployees] = useState({
    "1": { "id": 7, "name": "sahar", "phone": "0922225555", "created_at": "2026-04-18T14:31:13.000000Z" },
    "2": { "id": 8, "name": "memo", "phone": "0944443333", "created_at": "2026-04-18T14:31:33.000000Z" }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSave = (data) => {
    console.log(selectedEmployee ? "تحديث موظف" : "إضافة موظف", data);
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
        console.log("حذف الموظف:", id);
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8 max-w-7xl mx-auto" dir="rtl">
      {/* الهيدر المتجاوب */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-[#0f172a]">إدارة الموظفين</h1>
          <p className="text-slate-400 font-bold text-sm md:text-base mt-1">
            يمكنك إضافة، تعديل أو حذف موظفي فرعك
          </p>
        </div>
        <MyButton 
          title="إضافة موظف" 
          icon={<UserPlus size={20} />} 
          onClick={() => { setSelectedEmployee(null); setIsModalOpen(true); }}
          className="bg-[#0f172a] text-white px-6 py-3 md:py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform w-full sm:w-auto justify-center"
        />
      </div>

      <EmployeeList
        employees={employees} 
        onEdit={(emp) => { setSelectedEmployee(emp); setIsModalOpen(true); }}
        onDelete={handleDelete}
      />

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