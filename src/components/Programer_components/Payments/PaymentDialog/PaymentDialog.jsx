import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

const PaymentDialog = ({ isOpen, onClose, payment }) => {
  const [formData, setFormData] = useState({ amount_paid: '', currency: 'SAR', payment_method: '', reference_number: '' });



  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="rounded-[30px]" dir="rtl">
        <DialogHeader><DialogTitle>{payment ? 'تعديل دفعة' : 'إضافة دفعة جديدة'}</DialogTitle></DialogHeader>
        <form
        //  onSubmit={handleSubmit} 
        className="space-y-4">
          <MyInput type="number" placeholder="المبلغ" className="w-full p-3 border rounded-xl" value={formData.amount_paid} onChange={e => setFormData({...formData, amount_paid: e.target.value})} required />
          <MyInput type="text" placeholder="طريقة الدفع" className="w-full p-3 border rounded-xl" value={formData.payment_method} onChange={e => setFormData({...formData, payment_method: e.target.value})} required />
          <MyButton title={'حفظ'} type="submit" className="w-full bg-[#3198c1] text-white py-3 rounded-xl font-bold"/>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;