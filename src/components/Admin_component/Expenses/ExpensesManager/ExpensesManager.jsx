import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import MyButton from '@/components/MyButton/MyButton';
import ExpenseTable from '../ExpenseTable/ExpenseTable';
import ExpenseModal from '../ExpenseModal/ExpenseModal';
import { testExpenses } from './lib';

const ExpensesManager = () => {
  const [expenses, setExpenses] = useState(testExpenses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ type: '', amount: '', notes: '' });
  const [editingId, setEditingId] = useState(null); 

  const handleEditClick = (expense) => {
    setEditingId(expense.id);
    setFormData({ 
      type: expense.type,
      amount: expense.amount,
      notes: expense.notes || ''
    });
    setIsModalOpen(true); 
  };

  const handleOpenAddModal = () => {
    setEditingId(null); 
    setFormData({ type: '', amount: '', notes: '' }); 
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExpenses(expenses.map(exp => 
        exp.id === editingId ? { ...exp, ...formData } : exp
      ));
    } else {
      const newExpense = { ...formData, id: Date.now(), created_at: new Date().toISOString() };
      setExpenses([newExpense, ...expenses]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-[#fcfcfc]" dir="rtl">
<div className="mb-8 text-right" dir="rtl">
  <h1 className="text-3xl font-black text-[#0f172a]">المصاريف</h1>
  <p className="text-slate-400 font-bold text-sm mt-1">سجل إحصائيات المصاريف التشغيلية للفرع</p>
</div>     
     <div 
      className="flex w-fit m-11 items-center gap-2 bg-[#050b1a] text-white px-4 py-2 rounded-2xl cursor-pointer hover:bg-black transition-all shadow-sm" 
      onClick={handleOpenAddModal}
    >
      <Plus size={18} />
      <span className="text-sm font-black">تسجيل مصروف</span>
    </div>
      <ExpenseTable 
        data={expenses} 
        // onDelete={handleDelete} 
        onEdit={handleEditClick} 
      />
      
      <ExpenseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
      />
    </div>
  );
};

export default ExpensesManager;