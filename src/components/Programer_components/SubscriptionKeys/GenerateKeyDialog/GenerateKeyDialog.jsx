import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

const GenerateKeyDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ count: 1, duration_months: 1 });

 

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[30px]" dir="rtl">
        <DialogHeader><DialogTitle>توليد أكواد اشتراك جديدة</DialogTitle></DialogHeader>
        <form
        //  onSubmit={handleGenerate} 
         className="space-y-4 py-4">
          <label className="block text-sm font-bold">عدد الأكواد (1-100)</label>
          <MyInput type="number" min="1" max="100" className="w-full p-4 border rounded-xl" value={formData.count} onChange={e => setFormData({...formData, count: e.target.value})} />
          
          <label className="block text-sm font-bold">المدة بالأشهر</label>
          <MyInput type="number" min="1" max="24" className="w-full p-4 border rounded-xl" value={formData.duration_months} onChange={e => setFormData({...formData, duration_months: e.target.value})} />
          
          <MyButton title={'توليد الآن'} type="submit" className="w-full bg-[#0f172a] text-white py-4 rounded-xl font-bold mt-4"/>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GenerateKeyDialog;