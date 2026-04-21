import MyButton from '@/components/MyButton/MyButton';
import MyInput from '@/components/MyInput/MyInput';
import React from 'react';


const ExpenseModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0f172a]/20 backdrop-blur-md z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-[32px] p-8 shadow-2xl animate-in fade-in zoom-in duration-300">
        <h2 className="text-xl font-black text-[#0f172a] mb-6">تسجيل مصروف</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          
          <MyInput 
            label="نوع المصروف"
            placeholder="مثلاً: صيانة، فواتير..."
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            required
          />

          <MyInput 
            label="المبلغ (ر.س)"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
          />

          <div className="flex flex-col gap-2">
             <label className="text-xs font-black text-slate-400 mr-2">ملاحظات</label>
             <textarea 
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#3198c1] outline-none min-h-[80px]"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
             />
          </div>

          <div className="flex gap-3 pt-6">
            <MyButton title={'حفظ'} onClick={onSubmit} type="submit" className="flex-1 bg-[#3198c1]"/>
            <MyButton title={'إلغاء'} type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-500"/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpenseModal;
