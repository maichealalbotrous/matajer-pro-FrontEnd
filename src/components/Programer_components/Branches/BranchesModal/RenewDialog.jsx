import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

const RenewDialog = ({ isOpen, onClose, branch }) => {
  const [months, setMonths] = useState(1);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-[30px]" dir="rtl">
        <DialogHeader>
          <DialogTitle className="font-black text-lg">
            تجديد اشتراك: {branch?.name}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <label className="block text-sm font-bold mb-2">عدد الأشهر</label>
          <MyInput
            type="number"
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="w-full p-4 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#3198c1]"
          />
        </div>

        <DialogFooter className="flex gap-2">
          <MyButton
            title={"إلغاء"} 
            onClick={onClose} 
            className="flex-1 py-3 bg-slate-100 rounded-xl font-bold hover:bg-slate-200"
          />
            
          <MyButton 
          title={'تجديد'}
            // onClick={handleRenew} 
            className="flex-1 py-3 bg-[#3198c1] text-white rounded-xl font-bold hover:bg-[#287d9f]"
          />
            
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenewDialog;