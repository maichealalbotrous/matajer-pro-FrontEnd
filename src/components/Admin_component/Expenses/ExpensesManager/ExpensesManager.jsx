import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import ExpenseModal from '../ExpenseModal/ExpenseModal';
import { testExpenses } from './lib';
const ExpensesManager = () => {
  const [expenses, SetExpenses] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: '', amount: '', notes: '' });



  return (
    <div className="p-8 bg-[#fcfcfc] min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-[#0f172a]">المصروفات</h1>
          <p className="text-slate-400 font-bold text-sm">إدارة السجلات المالية للفرع</p>
        </div>
        <MyButton onClick={() => setIsModalOpen(true)} className="flex items-center gap-2"/>
          <Plus size={18} /> تسجيل مصروف
      </div>

      <ExpenseTable data={testExpenses} loading={!Array.isArray(expenses) ? loading : false} />
      
      <ExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ExpensesManager;