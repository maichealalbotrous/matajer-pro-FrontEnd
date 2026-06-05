import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';
import { generateSubscriptionKeysServer } from '../SubscriptionKeysManager/lib';

const GenerateKeyDialog = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({ count: 1, duration_months: 1 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await generateSubscriptionKeysServer(formData);
      setFormData({ count: 1, duration_months: 1 });
      if (onSuccess) onSuccess(); 
      onClose(); 
    } catch (err) {
      setError(err.message || "حدث خطأ أثناء توليد الأكواد.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[30px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-black text-right text-lg">توليد أكواد اشتراك جديدة</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold rounded-xl text-right">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleGenerate} className="space-y-4 py-2">
          <div className="space-y-1 text-right">
            <label className="block text-sm font-bold text-slate-700">عدد الأكواد (1-100)</label>
            <MyInput 
              type="number" 
              min="1" 
              max="100" 
              className="w-full p-4 border rounded-xl" 
              value={formData.count} 
              onChange={e => setFormData({...formData, count: e.target.value})} 
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-1 text-right">
            <label className="block text-sm font-bold text-slate-700">المدة بالأشهر</label>
            <MyInput 
              type="number" 
              min="1" 
              max="24" 
              className="w-full p-4 border rounded-xl" 
              value={formData.duration_months} 
              onChange={e => setFormData({...formData, duration_months: e.target.value})} 
              disabled={isSubmitting}
            />
          </div>
          
          <MyButton 
            title={isSubmitting ? 'جاري التوليد...' : 'توليد الآن'} 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#0f172a] hover:bg-black text-white py-4 rounded-xl font-bold mt-4 transition-all"
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateKeyDialog;