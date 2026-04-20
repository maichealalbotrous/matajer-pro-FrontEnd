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
    if (selectedEmployee) {
      console.log("تحديث الموظف (PUT):", selectedEmployee.id, data);
    } else {
      console.log("إضافة موظف جديد (POST):", data);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if(window.confirm("هل أنت متأكد من حذف هذا الموظف؟")) {
        console.log("حذف الموظف (DELETE):", id);
    }
  };

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a]">إدارة الموظفين</h1>
          <p className="text-slate-400 font-bold mt-1">يمكنك إضافة، تعديل أو حذف موظفي فرعك</p>
        </div>
        <MyButton 
          title="إضافة موظف" 
          icon={<UserPlus size={20} />} 
          onClick={() => { setSelectedEmployee(null); setIsModalOpen(true); }}
          className="bg-[#0f172a] text-white px-6 py-4 rounded-2xl font-black flex items-center gap-2 shadow-lg hover:scale-105 transition-transform"
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