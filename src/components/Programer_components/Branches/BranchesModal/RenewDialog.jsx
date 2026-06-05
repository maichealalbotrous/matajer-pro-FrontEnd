import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { manualRenewBranchServer } from '../BrancheManager/lib';

const RenewDialog = ({ isOpen, onClose, branch, onSuccess }) => {
  const [months, setMonths] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setMonths(1);
      setError("");
    }
  }, [isOpen]);

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    if (!branch?.id) return;
    
    setIsSubmitting(true);
    setError("");

    try {
      await manualRenewBranchServer(branch.id, months);
      if (onSuccess) onSuccess(); // تحديث القائمة الرئيسية
      onClose();
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء محاولة تجديد الفرع.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[30px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-black text-right text-lg text-slate-900">
            تجديد اشتراك فرع: <span className="text-[#3198c1]">{branch?.name}</span>
          </DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl text-right">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleRenewSubmit} className="space-y-4">
          <div className="py-2 text-right">
            <label className="block text-sm font-bold mb-2 text-slate-700">عدد الأشهر المطلوبة للتجديد</label>
            <MyInput
              type="number"
              min="1"
              value={months}
              disabled={isSubmitting}
              onChange={(e) => setMonths(e.target.value)}
              className="w-full p-4 border border-slate-200 rounded-2xl outline-none"
            />
          </div>

          <DialogFooter className="flex gap-3 sm:space-x-reverse">
            <MyButton
              title={"إلغاء"} 
              type="button"
              onClick={onClose} 
              disabled={isSubmitting}
              className="flex-1 py-3 bg-slate-100 rounded-xl font-bold hover:bg-slate-200 transition-colors text-slate-600"
            />
              
            <MyButton 
              title={isSubmitting ? 'جاري التجديد...' : 'تأكيد التجديد الآن'}
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#3198c1] text-white rounded-xl font-bold hover:bg-[#287d9f] transition-all shadow-sm"
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenewDialog;