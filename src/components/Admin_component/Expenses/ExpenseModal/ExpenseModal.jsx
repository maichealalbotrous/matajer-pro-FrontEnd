import React from 'react';
import MyButton from '@/components/MyButton/MyButton';
import MyInput from '@/components/MyInput/MyInput';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 

const ExpenseModal = ({ isOpen, onClose, onSubmit, formData, setFormData, loading, error, isEditMode }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-[32px] p-8 border-none shadow-2xl">
        <DialogHeader className="text-right">
          <DialogTitle className="text-xl font-black text-[#0f172a] mb-2">
            {isEditMode ? "تعديل المصروف" : "تسجيل مصروف جديد"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-600 border border-red-100 font-bold rounded-xl text-right">
            {error}
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4">
          <MyInput 
            label="نوع المصروف"
            placeholder="مثلاً: صيانة، فواتير..."
            value={formData.type}
            onChange={(e) => setFormData({...formData, type: e.target.value})}
            required
            disabled={loading}
          />

          <MyInput 
            label="المبلغ (ر.س)"
            type="number"
            placeholder="0.00"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
            disabled={loading}
          />

          <div className="flex flex-col gap-2">
             <label className="text-xs font-black text-slate-400 mr-2">ملاحظات</label>
             <textarea 
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-[#3198c1] outline-none min-h-[80px] resize-none"
                placeholder="تفاصيل إضافية مبررة للحسابات..."
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                disabled={loading}
             />
          </div>

          <div className="flex gap-3 pt-6">
            <MyButton 
              title={loading ? 'جاري الحفظ...' : 'حفظ'} 
              type="submit" 
              className="flex-1 bg-[#3198c1]"
              disabled={loading}
            />
            <MyButton 
              title={'إلغاء'} 
              type="button" 
              onClick={onClose} 
              className="flex-1 bg-slate-100 text-slate-500 hover:bg-slate-200"
              disabled={loading}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;