import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import MyInput from '@/components/MyInput/MyInput';
import MyButton from '@/components/MyButton/MyButton';

const DiscountFormModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-[32px] p-8 border-none shadow-2xl overflow-hidden">
        <DialogHeader className="text-right">
          <DialogTitle className="text-xl font-black text-[#0f172a] mb-6">إضافة قاعدة خصم</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <MyInput 
            label="رقم المنتج (ID)" 
            placeholder="أدخل معرف المنتج من المخزن"
            value={formData.product_id}
            onChange={(e) => setFormData({...formData, product_id: e.target.value})}
            required 
          />
          <div className="grid grid-cols-1 gap-4">
          
            <div className="flex flex-col gap-2">
              <label className="text-xs  font-black text-slate-400 ">النوع</label>
              <select 
                className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm font-bold outline-none focus:ring-2 focus:ring-[#3198c1] transition-all"
                value={formData.discount_type}
                onChange={(e) => setFormData({...formData, discount_type: e.target.value})}
              >
                <option value="percentage">نسبة %</option>
                <option value="fixed">مبلغ ثابت</option>
              </select>
            </div>
         
            <MyInput 
              label="قيمة الخصم" 
              type="number"
              placeholder="0.00"
              value={formData.discount_value}
              onChange={(e) => setFormData({...formData, discount_value: e.target.value})}
              required 
            />
         
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <MyInput 
              label="تاريخ البدء"
              type="date"
              value={formData.start_date}
              onChange={(e) => setFormData({...formData, start_date: e.target.value})}
              required 
            />
            <MyInput 
              label="تاريخ الانتهاء"
              type="date"
              value={formData.end_date}
              onChange={(e) => setFormData({...formData, end_date: e.target.value})}
              required 
            />
          </div>
          <div className="flex gap-3 pt-6">
            <MyButton title="حفظ الخصم" type="submit" className=" p-3 flex-1 bg-[#3198c1]" />
            <MyButton title="إلغاء" type="button" onClick={onClose} className="flex-1 bg-slate-100 text-slate-500" />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DiscountFormModal;