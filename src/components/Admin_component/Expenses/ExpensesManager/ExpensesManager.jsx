import React, { useState } from 'react';
import { Plus } from 'lucide-react';
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
    setFormData({ type: expense.type, amount: expense.amount, notes: expense.notes || '' });
    setIsModalOpen(true); 
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المصروف؟")) {
      setExpenses(expenses.filter(exp => exp.id !== id));
    }
  };

  const handleOpenAddModal = () => {
    setEditingId(null); 
    setFormData({ type: '', amount: '', notes: '' }); 
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setExpenses(expenses.map(exp => exp.id === editingId ? { ...exp, ...formData } : exp));
    } else {
      const newExpense = { ...formData, id: Date.now(), created_at: new Date().toISOString() };
      setExpenses([newExpense, ...expenses]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6" dir="rtl">
      {/* الهيدر المتجاوب */}
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

      <ExpenseTable 
        data={expenses} 
        onDelete={handleDelete} 
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